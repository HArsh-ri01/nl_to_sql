'use client';

import { useEffect, useState, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function PlayerChart() {
  const [batsmanData, setBatsmanData] = useState([]);
  const [bowlerData, setBowlerData] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [role, setRole] = useState('batter');
  const [allPlayers, setAllPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('/batsman.csv')
      .then((res) => res.text())
      .then((data) => {
        const rows = data.trim().split('\n').slice(1).map((row) => {
          const [player_name, over, min_runs, max_runs, avg_runs] = row.split(',');
          return {
            player_name,
            over: +over + 1,
            min_runs: +min_runs,
            max_runs: +max_runs,
            avg_runs: +avg_runs,
          };
        });
        const filledBatsmanData = [];
        const batsmanMap = {};

        rows.forEach((row) => {
          if (!batsmanMap[row.player_name]) {
            batsmanMap[row.player_name] = {};
          }
          batsmanMap[row.player_name][row.over] = row;
        });

        Object.entries(batsmanMap).forEach(([name, overs]) => {
          for (let i = 1; i <= 20; i++) {
            if (!overs[i]) {
              filledBatsmanData.push({
                player_name: name,
                over: i,
                min_runs: 0,
                max_runs: 0,
                avg_runs: 0,
              });
            } else {
              filledBatsmanData.push(overs[i]);
            }
          }
        });

        setBatsmanData(filledBatsmanData);
        setAllPlayers((prev) => [...new Set([...prev, ...rows.map((r) => r.player_name)])]);
      });

    fetch('/bowlers.csv')
      .then((res) => res.text())
      .then((data) => {
        const rows = data.trim().split('\n').slice(1).map((row) => {
          const [player_name, over, total_wickets] = row.split(',');
          return {
            player_name,
            over: +over + 1,
            total_wickets: +total_wickets,
          };
        });
        const filledBowlerData = [];
        const bowlerMap = {};

        rows.forEach((row) => {
          if (!bowlerMap[row.player_name]) {
            bowlerMap[row.player_name] = {};
          }
          bowlerMap[row.player_name][row.over] = row;
        });

        Object.entries(bowlerMap).forEach(([name, overs]) => {
          for (let i = 1; i <= 20; i++) {
            if (!overs[i]) {
              filledBowlerData.push({
                player_name: name,
                over: i,
                total_wickets: 0,
              });
            } else {
              filledBowlerData.push(overs[i]);
            }
          }
        });

        setBowlerData(filledBowlerData);
        setAllPlayers((prev) => [...new Set([...prev, ...rows.map((r) => r.player_name)])]);
      });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredBatsman = batsmanData.filter((d) => d.player_name === playerName);
  const filteredBowler = bowlerData.filter((d) => d.player_name === playerName);
  const filteredPlayers = allPlayers.filter((player) =>
    player.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="max-w-5xl mx-auto pr-1 pl-1 pb-1 w-full bg-white text-gray-900 rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-bold mb-2 text-center text-black drop-shadow-sm">
        ⚔️ Player Stats ⚔️
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-4">
        {/* Dropdown */}
        <div className="w-full md:w-1/2 relative" ref={dropdownRef}>
          <label className="block mb-2 text-sm font-medium">Choose Your Player</label>
          <button
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg text-left focus:outline-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {playerName || 'Select a Player'}
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full bg-white mt-2 rounded-lg shadow-lg border border-gray-300 max-h-60 overflow-auto">
              <input
                type="text"
                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <div
                    key={player}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setPlayerName(player);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {player}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No players found</div>
              )}
            </div>
          )}
        </div>

        {/* Role Selector */}
        <div className="flex items-end gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="batter"
              checked={role === 'batter'}
              onChange={() => setRole('batter')}
              className="accent-blue-500"
            />
            Batter
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="bowler"
              checked={role === 'bowler'}
              onChange={() => setRole('bowler')}
              className="accent-red-500"
            />
            Bowler
          </label>
        </div>
      </div>

      {/* Chart Display */}
      <div className="bg-gray-50 rounded-xl border border-gray-200">
        {role === 'batter' && filteredBatsman.length > 0 ? (
          <ResponsiveContainer width="100%" height={400} className="p-0 m-0">
          <LineChart data={filteredBatsman}>
              <XAxis
                dataKey="over"
                stroke="#333"
                label={{ value: 'Overs', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke="#333"
                label={{ value: 'Runs', angle: -90, position: 'insideLeft' }}
              />

              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ccc' }} />
              <Legend />
              <Line type="monotone" dataKey="min_runs" stroke="#1e90ff" strokeWidth={2} dot />
              <Line type="monotone" dataKey="max_runs" stroke="#9400d3" strokeWidth={2} dot />
              <Line type="monotone" dataKey="avg_runs" stroke="#ff8c00" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        ) : role === 'bowler' && filteredBowler.length > 0 ? (
<ResponsiveContainer width="100%" height={400} className="p-0 m-0">
<LineChart data={filteredBowler}>
              <XAxis
                dataKey="over"
                stroke="#333"
                label={{ value: 'Overs', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke="#333"
                label={{ value: 'Wickets', angle: -90, position: 'insideLeft' }}
              />

              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ccc' }} />
              <Legend />
              <Line type="monotone" dataKey="total_wickets" stroke="#dc2626" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-10 text-red-600">
            <h3 className="text-xl font-semibold">🚫 No Stats Available</h3>
            <p>The selected player is not a <span className="capitalize">{role}</span>.</p>
          </div>
        )}
      </div>
    </section>
  );
}
