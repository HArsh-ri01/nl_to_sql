import sqlite3
from datetime import datetime, date
from enum import Enum

# Database paths
DB_PATH = "ipl_data.db"
IP_TRACKING_DB_PATH = "ip_tracking.db"


class LogLevel(Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"
    DEBUG = "DEBUG"


class DatabaseManager:
    @staticmethod
    def init_databases():
        """Initialize all database tables"""
        try:
            # Initialize IP tracking DB
            conn = sqlite3.connect(IP_TRACKING_DB_PATH)

            # IP tracking table
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS ip_tracking (
                    ip_address TEXT PRIMARY KEY,
                    request_count INTEGER,
                    last_request_date DATE
                )
            """
            )

            # Global counter table
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS global_counter (
                    counter_id TEXT PRIMARY KEY,
                    total_count INTEGER,
                    last_date DATE
                )
            """
            )

            # Query history table
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS query_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ip_address TEXT,
                    user_query TEXT,
                    sql_query TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    success BOOLEAN
                )
            """
            )

            # Error logs table
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS error_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    level TEXT,
                    message TEXT,
                    source TEXT,
                    ip_address TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """
            )

            # Application logs table
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS app_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    level TEXT,
                    message TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """
            )

            # Initialize global counter if it doesn't exist
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM global_counter WHERE counter_id = 'daily_total'"
            )
            if not cursor.fetchone():
                today = date.today()
                cursor.execute(
                    "INSERT INTO global_counter (counter_id, total_count, last_date) VALUES (?, ?, ?)",
                    ("daily_total", 0, today),
                )

            conn.commit()
            conn.close()
            print("Database initialization successful")  # Fallback logging
            return True
        except Exception as e:
            print(f"Error initializing databases: {str(e)}")  # Fallback logging
            # Don't raise, let the application continue with degraded functionality
            return False


class LogManager:
    @staticmethod
    def log_to_db(level, message, source=None, ip_address=None):
        """Log an entry to the error_logs table"""
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO error_logs (level, message, source, ip_address)
            VALUES (?, ?, ?, ?)
            """,
            (
                level.value if isinstance(level, LogLevel) else level,
                message,
                source,
                ip_address,
            ),
        )

        conn.commit()
        conn.close()

    @staticmethod
    def log_app_activity(level, message):
        """Log general application activity"""
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO app_logs (level, message)
            VALUES (?, ?)
            """,
            (level.value if isinstance(level, LogLevel) else level, message),
        )

        conn.commit()
        conn.close()

    @staticmethod
    def get_logs(log_type="error", limit=100, offset=0, level=None):
        """Retrieve logs from the database"""
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()

        table = "error_logs" if log_type == "error" else "app_logs"
        query = f"SELECT * FROM {table}"
        params = []

        if level:
            query += " WHERE level = ?"
            params.append(level.value if isinstance(level, LogLevel) else level)

        query += " ORDER BY timestamp DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])

        cursor.execute(query, params)
        results = cursor.fetchall()

        # Get column names
        column_names = [description[0] for description in cursor.description]

        # Convert to list of dictionaries
        logs = []
        for row in results:
            log_entry = {}
            for i, column in enumerate(column_names):
                log_entry[column] = row[i]
            logs.append(log_entry)

        conn.close()
        return logs
