"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

export default function ChatView() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showSQL, setShowSQL] = useState(false);
  const [currentSQL, setCurrentSQL] = useState("");
  const [fullTableHtml, setFullTableHtml] = useState("");
  const [showTableModal, setShowTableModal] = useState(false);
  const [feedbackInProgress, setFeedbackInProgress] = useState(false);
  const LottiePlaceholder = dynamic(() => import("./LottiePlaceholder"), {
    ssr: false,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Use a width threshold (e.g., 640px) to detect mobile devices
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const suggestedQuestions = [
    "Who scored the most runs in Indian Premiere League",
    "Show me the top 5 wicket-takers in IPL",
    "Which team won the most matches in IPL",
    "Who holds the record for the most sixes hit in the 20th over ?",
  ];

  // Randomly pick 2 different questions
  const getRandomQuestions = () => {
    const shuffled = [...suggestedQuestions]; // Clone the array to avoid mutating the original
    // Shuffle the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled.slice(0, 2); // Return the first 2 elements (guaranteed to be different)
  };

  const randomQuestions = getRandomQuestions();

  useEffect(() => setHasHydrated(true), []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message) => {
    if (message === "") {
      setMessages([]); // Clears all messages when the new chat button is clicked
      return;
    }
    const content = message || input;
    if (!content.trim()) return;

    const newMessages = [...messages, { sender: "user", text: content }];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);    
    try {
      const formData = new FormData();
      formData.append("user_query", content);

      const res = await fetch("/api/process_query/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          { sender: "bot", text: data.error, sql: data.sql_query || "" },
        ]);
      } else {
        const generateTableHTML = (data) => {
          if (!Array.isArray(data) || data.length === 0) return "<p>I don't know the answer of this query</p>";
        
          const headers = Object.keys(data[0]);
          const headerRow = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
          const bodyRows = data.map(row => {
            return `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`;
          }).join('');
        
          // Wrap in a scrollable container
          return `
            <div style="overflow-x: auto; max-width: 100%;">
              <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: max-content; min-width: 100%;">
                <thead>${headerRow}</thead>
                <tbody>${bodyRows}</tbody>
              </table>
            </div>
          `;
        };
        
        
        const tableHTML = generateTableHTML(data.result);
        
        setMessages([
          ...newMessages,
          {
            sender: "bot",
            text: tableHTML,
            sql: data.sql_query || ""
          },
        ]);
        
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Something went wrong.", sql: "" },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const sendFeedback = async (userQuery, sqlQuery, feedbackType) => {
    try {
      setFeedbackInProgress(true);

      // Create form data for the request
      const formData = new FormData();
      formData.append("user_query", userQuery);
      formData.append("sql_query", sqlQuery);
      formData.append("feedback_type", feedbackType);

      // Send feedback to backend
      const res = await fetch("/api/feedback/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success(feedbackType === "positive" ? "Thanks for the positive feedback!" : "Thanks for your feedback. We'll improve!");
      } else {
        toast.error("Failed to send feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast.error("Error sending feedback. Please try again.");
    } finally {
      setFeedbackInProgress(false);
    }
  };

  function renderBotMessageWithTables(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tables = doc.querySelectorAll("table");

    if (tables.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    const parts = [];
    let lastIndex = 0;

    tables.forEach((table, i) => {
      const fullHtml = table.outerHTML;
      const startIndex = html.indexOf(fullHtml, lastIndex);
      const rows = table.querySelectorAll("tr");
      const rowCount = rows.length;

      if (startIndex > lastIndex) {
        const textBefore = html.slice(lastIndex, startIndex);
        parts.push(
          <div key={`text-before-${i}`} dangerouslySetInnerHTML={{ __html: textBefore }} />
        );
      }

      const header = rows[0].outerHTML;
      const firstFourRows = Array.from(rows).slice(1, 5).map((row) => row.outerHTML).join("");
      const truncatedTable = `<table>${header}${firstFourRows}</table>`;

      const shouldTruncate = rowCount > 5;

      const containerStyles = {
        overflowX: "auto",
        maxWidth: "100%",
        margin: "1rem 0",
        textAlign: "left",
      };

      const tableStyles = {
        minWidth: "600px",
        display: "inline-block",
      };

      if (shouldTruncate) {
        // Show first 4 rows with View Full Table button
        parts.push(
          <div key={`truncated-${i}`} style={containerStyles}>
            <div
              style={tableStyles}
              dangerouslySetInnerHTML={{ __html: truncatedTable }}
            />
          </div>
        );
        parts.push(
          <div key={`btn-${i}`} style={{ margin: "0.5rem 0", textAlign: isMobile ? "center" : "left" }}>
            <button
              className="view-table-btn"
              onClick={() => {
                setFullTableHtml(fullHtml);
                setShowTableModal(true);
              }}
            >
              View Full Table
            </button>
          </div>
        );
      } else {
        // Show full table
        parts.push(
          <div key={`full-table-${i}`} style={containerStyles}>
            <div
              style={tableStyles}
              dangerouslySetInnerHTML={{ __html: fullHtml }}
            />
          </div>
        );
      }

      lastIndex = startIndex + fullHtml.length;
    });

    if (lastIndex < html.length) {
      const remainingText = html.slice(lastIndex);
      parts.push(<div key="text-after" dangerouslySetInnerHTML={{ __html: remainingText }} />);
    }

    return <>{parts}</>;
  }


  if (!hasHydrated) return null;

  return (
    <div className="">
      <Toaster />

      <main className="chat-area">
        <div className="messages">
          {/* Display Lottie animation if there are no messages */}
          {messages.length === 0 && (
            <div className="empty-state-container">
              <LottiePlaceholder />
            </div>
          )}

          {/* Display messages */}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`message ${msg.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="avatar">
                {msg.sender === "user" ? "🧑" : "🤖"}
              </div>
              <div className="bubble">
                {msg.sender === "bot"
                  ? renderBotMessageWithTables(msg.text)
                  : msg.text}
              </div>
              {/* Feedback buttons just below the bubble, outside the card */}
              {msg.sender === "bot" && i > 0 && (
                <div className="feedback-buttons">
                  <button
                    className="feedback-btn positive"
                    onClick={() => sendFeedback(messages[i-1].text, msg.sql || "", "positive")}
                    disabled={feedbackInProgress}
                  >
                    👍
                  </button>
                  <button
                    className="feedback-btn negative"
                    onClick={() => sendFeedback(messages[i-1].text, msg.sql || "", "negative")}
                    disabled={feedbackInProgress}
                  >
                    👎
                  </button>
                </div>
              )}
              <div className="message-actions">
                {msg.sender === "bot" && msg.sql && (
                  <button
                    className="view-sql-btn"
                    onClick={() => {
                      setCurrentSQL(msg.sql);
                      setShowSQL(true);
                    }}
                  >
                    🧠
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {/* Display loading animation when bot is thinking */}
          {isThinking && (
            <div className="message bot">
              <div className="avatar">🤖</div>
              <div className="bubble loader-container">
                <div className="loader" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input box appears when there are messages */}
        {messages.length > 0 && (
          <div className="input-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Cricket..."
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        )}

        {messages.length === 0 && (
          <div className="suggested-container">
            {[
              ["Who scored the most runs in IPL ?",
                "Show me the top 5 wicket-takers in IPL ?"], [
                "Which team won the most matches in IPL ?"],
            ].map((row, rowIndex) => (
              <div key={rowIndex} className="suggested-row">
                {row.map((q, idx) => (
                  <button
                    key={idx}
                    className="suggested-bubble"
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}



        <div className="chat-input-area">
          {/* Input box appears when no messages */}
          {messages.length === 0 && (
            <div className="input-box center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask Cricket..."
              />
              <button onClick={() => sendMessage()}>Send</button>
            </div>
          )}        </div>



      </main>

      {/* Modal and CSS below */}
      {showSQL && (
        <div
          className="modal-overlay"
          onClick={() => setShowSQL(false)} // Close the modal when clicking outside
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowSQL(false)} // Close the modal on button click
            >
              ×
            </button>
            <h2 className="modal-title">Generated SQL</h2>
            <pre className="modal-sql">{currentSQL}</pre>
            <div className="modal-footer">
              <button
                onClick={() => setShowSQL(false)}
                className="modal-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showTableModal && (
        <div className="modal-overlay" onClick={() => setShowTableModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowTableModal(false)}
            >
              ×
            </button>
            <h2 className="modal-title">Full Table</h2>

            {/* 🔧 Scrollable wrapper for the table */}
            <div className="modal-table-wrapper">
              <div dangerouslySetInnerHTML={{ __html: fullTableHtml }} />
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowTableModal(false)}
                className="modal-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          height: 100%;
          width: 100%;
          font-family: "Inter", sans-serif;
          background: linear-gradient(to right, #f0f4f8, #ffffff);
          color: #111827;
        }

        .view-table-btn {
background: linear-gradient(135deg, #26e2a3, #00b88f);
  border: none;
  color: white;
  font-weight: 500;
  padding: 0.6rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.view-table-btn:hover {
  transform: scale(1.05);
}

.feedback-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 4px;
  padding-top: 0;
}

.feedback-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.feedback-btn:hover {
  transform: scale(1.1);
}

.feedback-btn.positive:hover {
  background: #dcfce7;
}

.feedback-btn.negative:hover {
  background: #fee2e2;
}

.feedback-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .input-box {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-sizing: border-box;
  }

  .input-box input {
    flex: 1;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  .input-box button {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
    white-space: nowrap;
  }
}

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 12px;
          width: 90%;
          max-width: 700px; /* 📏 Medium width */
          max-height: 80vh; /* ⛔ Prevents vertical overflow */
          overflow-y: auto; /* ✅ Enables vertical scrolling */
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .modal-table-wrapper {
          overflow: auto; /* ✅ Scrolls if table is big */
          max-height: 60vh;
          border-radius: 8px;
          background: #f9fafb;
          padding: 1rem;
          margin-top: 1rem;
        }

        /* Optional nice scrollbars */
        .modal-table-wrapper::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .modal-table-wrapper::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.2);
          border-radius: 4px;
        }

       .suggested-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.suggested-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap; /* good for smaller screens */
  justify-content: center;
}

.suggested-bubble {
  background-color: #f1f5f9;
  border: none;
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.suggested-bubble:hover {
  background-color: #e2e8f0;
}

/* Make suggestion bubbles smaller on screens < 480px */
@media (max-width: 480px) {
  .suggested-bubble {
    padding: 4px 10px;
    font-size: 12px;
  }

  .suggested-row {
    gap: 8px;
  }
}


        .empty-state-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80%;
          gap: 2rem;
        }

        .lottie-wrapper {
          width: 300px;
          height: 300px;
        }

        .layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .chat-area {
          height: 80vh; /* 🔧 Ensure the area uses full viewport height */
          overflow: hidden; /* Already there — good */
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 2rem;
          scroll-behavior: smooth;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .message.user {
          justify-content: flex-end;
          flex-direction: row-reverse;
        }

        .message.bot {
          flex-direction: column;
          align-items: flex-start;
        }

        .message .avatar {
          width: 36px;
          height: 36px;
          background: #e0f2fe;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 1.25rem;
          font-weight: bold;
          color: #0284c7;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .bubble {
          max-width: 70%;
          background: #ffffff;
          border-radius: 20px;
          padding: 0.75rem 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          font-size: 0.95rem;
          line-height: 1.4;
          word-break: break-word;
          margin-bottom: 0;
        }

        .message.user .bubble {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          color: #ffffff;
          margin-left: auto;
        }

        /* Default input box style */
        .input-box {
          display: flex;
          align-items: center; /* Vertically align items */
          justify-content: space-between; /* Position input and button */
          width: 90%; /* Set width as a percentage of the viewport */
          max-width: 500px; /* Max width for the input box */
          padding: 0.5rem 1rem; /* Padding adjusted to balance appearance */
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          gap: 0.75rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          box-sizing: border-box; /* Ensure padding is inside the box */
          margin: 0 auto; /* Center the input box horizontally */
        }

        /* Centered input box style */
        .input-box.center {
          display: flex;
          flex-direction: row;
          justify-content: center; /* Centers the entire input box */
          align-items: center;
          position: relative;
          width: 90%; /* Responsive width */
          max-width: 500px; /* Max width for the input box */
          padding: 0.5rem 1rem; /* Reduced padding for better balance */
          gap: 0.75rem;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          box-sizing: border-box; /* Ensures padding is inside the box */
          margin: 0 auto; /* Ensures the box is horizontally centered */
        }

        /* Input field style */
        .input-box input {
          flex-grow: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
        }

        /* Button style */
        .input-box button {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          color: white;
          font-weight: 500;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .input-box button:hover {
          transform: scale(1.05);
        }

        .empty-state h1 {
          font-size: 1.2rem;
          font-weight: 500;
          color: #6b7280;
        }

        .loader-container {
          background: #f3f4f6;
          padding: 0.8rem 1rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader {
          width: 120px;
          height: 20px;
          -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) 0/20%;
          background: linear-gradient(#000 0 0) 0/0% no-repeat #ddd;
          animation: l4 2s infinite steps(6);
        }

        @keyframes l4 {
          100% {
            background-size: 120%;
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 80%;
          max-width: 900px;
          position: relative;
        }

        .modal-close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          color: #888;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .modal-close-btn:hover {
          color: #333;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .modal-sql {
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          font-family: "Courier New", monospace;
          font-size: 1rem;
          white-space: pre-wrap;
          word-wrap: break-word;
          max-height: 400px;
          overflow-y: auto;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .modal-footer button {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .modal-footer button:hover {
          background-color: #0056b3;
        }

        .view-sql-btn {
          font-size: 0.875rem;
          color: black;
          background-color: #d3e8f5;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .view-sql-btn:hover {
          background-color: #2563eb;
          transform: scale(1.05);
        }

        .view-sql-btn:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        .view-sql-btn:active {
          transform: scale(0.98);
        }

        /* Table Styling */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background-color: #fff;
          box-shadow: none; /* 🔥 Remove box shadow */
          border: none; /* 🔥 Remove outer border */
        }

        table th,
        table td {
          padding: 10px 15px;
          text-align: left;
          border: none; /* 🔥 Remove all row/cell dividers */
        }

        table th {
          background-color: #f9fafb;
          font-weight: bold;
          color: #333;
        }

        table tr:nth-child(even) {
          background-color: #f7fafc;
        }

        table tr:hover {
          background-color: #eef2f7;
          cursor: pointer;
        }

        table td {
          color: #6b7280;
        }

        table td a {
          color: #2563eb;
          text-decoration: none;
        }

        table td a:hover {
          text-decoration: underline;
        }

        .feedback-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 4px;
          padding-top: 0;
        }

        .feedback-btn {
          background: #f3f4f6;
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .feedback-btn.positive:hover {
          background: #d1fae5;
        }

        .feedback-btn.negative:hover {
          background: #fee2e2;
        }

        .feedback-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}