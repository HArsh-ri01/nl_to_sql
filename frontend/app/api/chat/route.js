import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// SQL generator using OpenAI
async function generateSQL(userMessage) {
  const prompt = `
  You are a PostgreSQL expert helping with a cricket database.
  
  Generate a SELECT SQL query (PostgreSQL format) to answer the following question:
  "${userMessage}"
  
  Only use these two tables and their columns:
  
  match_info(
    "match_id", "City", "Venue", "Match Type", "Gender", "Season", "Date", "Balls Per Over", "Teams", "Player of Match",
    "Match Number", "Event Name", "Match Referees", "Reserve Umpires", "TV Umpires", "Umpires", "Toss Winner", 
    "Toss Decision", "Winner", "Win Method", "Win By Wickets"
  )
  
  match_innings(
    "match_id", "Inning", "Over", "Ball", "Batter", "Non-striker", "Bowler", "Batter Runs", "Extras", "Total Runs",
    "Extra Types", "Wicket Type", "Player Out", "Fielders"
  )
  
  ⚠️ Important:
  1. Always quote column and table names with double quotes (e.g. "Bowler", not Bowler).
  2. When filtering by player names like "dhoni" or "MS Dhoni", always use: 
     \`"Player Out" ILIKE '%dhoni%'\`
  3. If you are aggregating any numeric values, cast using "::int" (e.g., SUM("Batter Runs"::int))
  4. Join tables via "match_id" if needed, but don't display it in select statement.
  5. Cast fields like "Over", "Ball", "Batter Runs", etc., to int before comparisons
  6. If the over is 20 return as 19, as it is counted from 0 to 19 in the database.
  7. These are the only available Seasons - 2007/08,2009,2009/10,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020/21,2021,2022,2023,2024,2025
  8. When checking for consecutive events (like 3 wickets in 3 balls by the same bowler), use the LAG() function with a window:
     - Partition by "match_id", "Inning", "Bowler"
     - Order by "Over"::int, "Ball"::int
     - Pre-filter rows where "Wicket Type" IS NOT NULL to improve performance
     - Then filter where current and previous 2 deliveries all have "Wicket Type" IS NOT NULL
     - Use Distinct if needed.
  9. Use contextual reasoning to interpret the likely intent of a question. For example, if someone asks 'What is Chennai Super Kings' best score in Bangalore?', interpret it as 'What is Chennai Super Kings' highest overall score at the M. Chinnaswamy Stadium in Bangalore?'
  10. Use contextual reasoning to infer the intended meaning of ambiguous or loosely phrased sports-related questions. For example, if someone asks 'What is CSK’s best score in Bangalore?', interpret it as 'What is Chennai Super Kings’ highest overall score at the M. Chinnaswamy Stadium in Bangalore?'. Be flexible in understanding both short forms and long forms of player names, team names, and stadiums.
  11. "When the user asks for a team's 'best score' in a particular location, interpret this as:
      -The team's highest total runs in a single match at that location.
      -Join match metadata with innings data.
      -Group by match ID, then SUM runs for each group (match).
      -Wrap this in a subquery and apply MAX on the total scores from that subquery.
      -This avoids the SQL error caused by nesting aggregate functions directly (e.g., MAX(SUM(...))).
      -"Always fully qualify column names when joining tables with overlapping column names (like 'match_id'), to avoid ambiguity errors. E.g., use 'match_info.match_id' instead of just 'match_id'."
      -Example Structure - SELECT MAX(total_score) FROM (
                          SELECT SUM("Total Runs"::int) AS total_score
                          FROM ...
                          WHERE ...
                          GROUP BY match_id
                        ) AS match_totals;
      - Handles fuzzy team name matching:
        - Map abbreviations like 'CSK' to full names such as 'Chennai Super Kings'.
        - Ensure both short and long forms of team names are supported.
        - Handles fuzzy city name matching:
        - Normalize city variations like 'Bangalore' to 'Bengaluru' or other common aliases.
        - Use case-insensitive search (ILIKE) for flexible matching.


  12. Only return valid SQL. No explanations or markdown. Don’t use semicolons.
  `;
  
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert SQL generator.' },
      { role: 'user', content: prompt },
    ],
  });

  let sqlQuery = response.choices[0].message.content.trim();
  return sqlQuery.replace(/```sql/g, '').replace(/```/g, '').replace(/;$/, '');
}

// HTML table formatter
function formatTable(data) {
  if (!Array.isArray(data) || data.length === 0) return '<p>No data found.</p>';

  const headers = Object.keys(data[0]);
  const headerRow = headers.map(h => `<th>${h}</th>`).join('');
  const bodyRows = data.map(row => {
    return `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`;
  }).join('');

  return `
    <table border="1" cellspacing="0" cellpadding="6">
      <thead><tr>${headerRow}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;
}

export async function POST(req) {
  const { userMessage } = await req.json();

  try {
    const greetings = ['hello', 'good morning', 'good evening', 'hey'];
    const userMessageLower = userMessage.toLowerCase();

    if (greetings.some(greeting => userMessageLower.includes(greeting))) {
      return new Response(JSON.stringify({
        assistantMessage: "Hello! Let's Talk Cricket?",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("🔍 User Question:", userMessage);

    let sqlQuery;
    let result;
    let lastError;

    // 🔍 Try fuzzy match first
    const { data: fuzzy, error: fuzzyErr } = await supabase
      .rpc('fuzzy_match_sql', { input_question: userMessage });

    if (fuzzy && fuzzy.length > 0) {
      sqlQuery = fuzzy[0].sql;
      console.log('✅ Using fuzzy matched SQL.');
    } else {
      // 🔁 If no similar match, try exact match cache
      const { data: cached, error: cacheError } = await supabase
        .from('sql_cache')
        .select('sql')
        .eq('question', userMessage)
        .maybeSingle();

      if (cached?.sql) {
        console.log('✅ Using exact cached SQL.');
        sqlQuery = cached.sql;
      } else {
        // 🎯 Generate fresh SQL if all cache fails
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            sqlQuery = await generateSQL(userMessage);
            console.log(`🧠 Attempt ${attempt} SQL:\n`, sqlQuery);
            
            // 🔍 Check if it looks like a valid SQL SELECT query
            if (!sqlQuery.toLowerCase().startsWith('select')) {
              sqlQuery = null; // Mark it as invalid
              continue; // Try next attempt if available
            }
            
            // ✅ Save only valid SQL to cache
            await supabase.from('sql_cache').insert([{ question: userMessage, sql: sqlQuery }]);
            break;
            
          } catch (genError) {
            lastError = genError;
            console.warn(`🛑 SQL Generation failed at attempt ${attempt}:`, genError);
          }
        }
      }
    }

    if (!sqlQuery) {
      return new Response(JSON.stringify({
        assistantMessage: "Please ask a valid question.",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    

    const { data, error } = await supabase.rpc('sql_execute', {
      query: sqlQuery,
    });

    if (error) {
      console.warn("❌ Execution Error:", error);
      return new Response(JSON.stringify({ error: "SQL execution failed.", details: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    result = data?.[0]?.result || [];
    const tableHTML = formatTable(result);

    return new Response(JSON.stringify({
      assistantMessage: result.length ? tableHTML : "No data found for your query.",
      sql: sqlQuery,
      results: result,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("🔥 Server Error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error.", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
