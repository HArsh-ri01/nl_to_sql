"use client";

import { useState, useMemo, useEffect } from "react";
import ChatView from "./components/ChatView";
import About from "./components/About";
import Welcome from "./components/Welcome";

import { MessageSquare, BarChart2, Info, Menu } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setFooterExpanded(true); // Always expanded on web
    };
  
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  const renderActiveComponent = useMemo(() => {
    switch (activeTab) {
      case "chat":
        return <ChatView />;
      case "stats":
        return <Welcome />;
      case "about us":
        return <About />;
      default:
        return <div>Hello World</div>;
    }
  }, [activeTab]);

  const icons = {
    chat: <MessageSquare size={20} />,
    stats: <BarChart2 size={20} />,
    "about us": <Info size={20} />,
  };

  return (
    <div className="layout">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div className="content-area">
        {/* Main Content */}
        <main className="main-content">{renderActiveComponent}</main>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo-container">
            <h2 className="logo">Ask IPL 🏏</h2>
          </div>

          <nav className="tab-nav">
            {["chat", "stats", "about us"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  setSidebarOpen(false); // Close after selection on mobile
                }}
              >
                {icons[tab]}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          {/* IPL Wisdom Card */}
          <div className="ipl-wisdom-card">
            <div>
              <div>🧠 My IPL wisdom ends at the match on <b>May 11th, 2025</b>.</div>
              <div>Everything after that is future me's problem. 😬</div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">
  <div className={`footer-content ${footerExpanded ? "expanded" : ""}`}>
  <p>
  © {new Date().getFullYear()} This project was built by students of the{" "}
  <a
    href="https://study.iitm.ac.in/ds/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: " #3b82f6", textDecoration: "underline" }}
  >
    BS in Data Science & Applications
  </a>{" "}
  program at IIT Madras.
</p>

    {(footerExpanded || !isMobile) && (
      <p>
      We received generous support from IIT Madras for cloud credits, and we&apos;re experimenting with this project.
      It might not always be accurate, and we ask for your understanding.
      <br />
      Please don&apos;t sue our professors or IIT Madras for any wrong data 😛.
    </p>
    
    )}
    {isMobile && (
      <button
        className="toggle-footer-btn"
        onClick={() => setFooterExpanded((prev) => !prev)}
      >
        {footerExpanded ? "Show Less" : "Show More About This Project"}
      </button>
    )}
  </div>
</footer>




      {/* CSS Styles */}
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: "Inter", sans-serif;
          background: #f5f5f5;
          color: #333;
        }


        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }

        .content-area {
          display: flex;
          flex: 1;
          overflow: hidden;
          flex-direction: row; /* sidebar to right */
        }

        main.main-content {
          flex: 1;
          padding: 1rem;
          background-color: #fff;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
          animation: fadeIn 0.3s ease forwards;
          overflow-y: auto;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(145deg, #f4f5f7, #e9ecef);
          border-left: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 1.5rem;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
          height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .logo-container {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo {
          font-size: 1.75rem;
          font-weight: bold;
          color: #2b2b2b;
        }

        .tab-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          color: #4a4a4a;
          transition: background 0.2s ease;
          cursor: pointer;
        }

        .tab-btn:hover {
          background-color: #dde1e7;
        }

        .tab-btn.active {
          background-color: #cdd6e0;
          color: #1f1f1f;
        }

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #f4f4f4;
  text-align: center;
  font-size: 0.9rem;
  color: #777;
  border-top: 1px solid #e0e0e0;
  z-index: 10;
}

.toggle-footer-btn {
  background: none;
  border: none;
  color: #0070f3;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .footer {
    font-size: 0.75rem;
    padding: 0.75rem 1rem;
  }

  .toggle-footer-btn {
    font-size: 0.75rem;
  }

  .footer-content p {
    margin: 0.3rem 0;
  }
}



        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 0.5rem;
          z-index: 100;
        }

        @media (max-width: 768px) {
          .content-area {
            flex-direction: column;
          }

          .sidebar {
            position: fixed;
            top: 0;
            right: 0;
            width: 70%;
            max-width: 280px;
            height: 100vh;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            z-index: 99;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            padding: 1rem;
          }

          .mobile-menu-btn {
            display: block;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .ipl-wisdom-card {
          margin-top: auto;
          background: #fffbe6;
          color: #b45309;
          border: 1px solid #fde68a;
          border-radius: 12px;
          padding: 1rem;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          text-align: left;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            right: 0;
            width: 70%;
            max-width: 280px;
            height: 100vh;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            z-index: 99;
          }
          .ipl-wisdom-card {
            font-size: 0.95rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
