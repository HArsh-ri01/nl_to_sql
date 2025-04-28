# /// script
# dependencies = [
#    "duckdb",
# ]
# ///

import duckdb

conn = duckdb.connect(database="ipl_data.db", read_only=True)
cursor = conn.cursor()
results = cursor.execute("SELECT distinct(player_name) FROM players").fetchall()
conn.close()

with open("players.txt", "w") as f:
    for row in results:
        f.write(row[0] + ",")
