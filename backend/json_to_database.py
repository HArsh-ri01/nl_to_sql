import os
import json
import sqlite3
import zipfile
from pathlib import Path

# === CONFIG ===
ZIP_PATH = "ipl_json.zip"
EXTRACT_DIR = "ipl_json"
DB_NAME = "ipl_data.db"

# === UNZIP ===
with zipfile.ZipFile(ZIP_PATH, "r") as zip_ref:
    zip_ref.extractall(EXTRACT_DIR)

# === INIT DB ===
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# === SCHEMA CREATION ===
cursor.executescript(
    """
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS deliveries;
DROP TABLE IF EXISTS wickets;
DROP TABLE IF EXISTS officials;

CREATE TABLE matches (
    match_id TEXT PRIMARY KEY,
    date TEXT,
    city TEXT,
    venue TEXT,
    match_number INTEGER,
    teams_name TEXT,
    overs INTEGER,
    balls_per_over INTEGER,
    event_name TEXT,
    team_type TEXT,
    gender TEXT,
    match_type TEXT,
    season TEXT,
    toss_winner TEXT,
    toss_decision TEXT,
    match_winner TEXT,
    player_of_match TEXT,
    win_by_runs INTEGER
);

CREATE TABLE teams (
    match_id TEXT,
    team_name TEXT
);

CREATE TABLE players (
    match_id TEXT,
    team_name TEXT,
    player_id TEXT,
    player_name TEXT
);

CREATE TABLE deliveries (
    match_id TEXT,
    inning INTEGER,
    over INTEGER,
    ball INTEGER,
    batter TEXT,
    bowler TEXT,
    non_striker TEXT,
    runs_batter INTEGER,
    runs_total INTEGER,
    extras TEXT
);

CREATE TABLE wickets (
    match_id TEXT,
    inning INTEGER,
    over INTEGER,
    ball INTEGER,
    player_out TEXT,
    bowler TEXT,
    kind TEXT
);

CREATE TABLE officials (
    match_id TEXT,
    role TEXT,
    name TEXT
);
"""
)
conn.commit()

# === PROCESS EACH FILE ===
for file in Path(EXTRACT_DIR).glob("*.json"):
    with open(file) as f:
        data = json.load(f)

    match_id = file.stem
    info = data["info"]
    registry = info.get("registry", {}).get("people", {})
    outcome = info.get("outcome", {})
    event = info.get("event", {})

    # Insert match record
    cursor.execute(
        """
        INSERT INTO matches VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
        (
            match_id,
            info["dates"][0],
            info.get("city"),
            info["venue"],
            event.get("match_number"),
            json.dumps([info["teams"][0], info["teams"][1]]),
            info.get("overs"),
            info.get("balls_per_over"),
            event.get("name"),
            info.get("team_type"),
            info["gender"],
            info["match_type"],
            info["season"],
            info["toss"]["winner"],
            info["toss"]["decision"],
            outcome.get("winner"),
            ",".join(info.get("player_of_match", [])),
            outcome.get("by", {}).get("runs"),
        ),
    )

    # Teams
    for team in info["teams"]:
        cursor.execute("INSERT INTO teams VALUES (?, ?)", (match_id, team))

    # Players
    for team, players in info["players"].items():
        for player in players:
            player_id = registry.get(player)
            cursor.execute(
                "INSERT INTO players VALUES (?, ?, ?, ?)",
                (match_id, team, player_id, player),
            )

    # Officials
    for role, names in info.get("officials", {}).items():
        for name in names:
            cursor.execute(
                "INSERT INTO officials VALUES (?, ?, ?)", (match_id, role, name)
            )

    # Deliveries + Wickets
    for inning_index, inning in enumerate(data.get("innings", []), 1):
        team = inning["team"]
        for over in inning["overs"]:
            over_num = over["over"]
            for ball_index, delivery in enumerate(over["deliveries"]):
                batter = delivery["batter"]
                bowler = delivery["bowler"]
                non_striker = delivery["non_striker"]
                runs = delivery["runs"]
                extras = json.dumps(delivery.get("extras", {}))
                cursor.execute(
                    """
                    INSERT INTO deliveries VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                    (
                        match_id,
                        inning_index,
                        over_num,
                        ball_index + 1,
                        batter,
                        bowler,
                        non_striker,
                        runs["batter"],
                        runs["total"],
                        extras,
                    ),
                )

                # Wickets
                if "wickets" in delivery:
                    for wicket in delivery["wickets"]:
                        cursor.execute(
                            """
                            INSERT INTO wickets VALUES (?, ?, ?, ?, ?, ?, ?)
                        """,
                            (
                                match_id,
                                inning_index,
                                over_num,
                                ball_index + 1,
                                wicket["player_out"],
                                bowler,
                                wicket["kind"],
                            ),
                        )

# === DONE ===
conn.commit()
conn.close()
print("✅ Done! Data loaded into", DB_NAME)
