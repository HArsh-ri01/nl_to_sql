import duckdb
conn = duckdb.connect(database='ipl_data.db')
result = conn.execute("SELECT SUM(CASE WHEN runs_batter = 6 THEN 1 ELSE 0 END) AS total_sixes FROM deliveries WHERE batter = 'WG Jacks' AND match_id IN (SELECT match_id FROM matches WHERE season = '2024')").fetchone()
if result[0] is not None:
    response = f'WG Jacks hit a total of {result[0]} sixes in all matches of the year 2024.'
else:
    response = 'WG Jacks did not hit any sixes in all matches of the year 2024.'