import sqlite3
from datetime import datetime, date
from models.db_models import IP_TRACKING_DB_PATH
from utils.logger import logger

# Request limits
MAX_DAILY_REQUESTS_PER_IP = 5
MAX_TOTAL_DAILY_REQUESTS = 5000


class IPTracker:
    @staticmethod
    def check_ip_limit(ip_address: str) -> bool:
        """
        Check if an IP address has exceeded the daily request limit
        Returns True if the IP is allowed to make a request, False otherwise
        """
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()

        # Check if IP exists in tracking table
        cursor.execute(
            "SELECT request_count, last_request_date FROM ip_tracking WHERE ip_address = ?",
            (ip_address,),
        )
        result = cursor.fetchone()

        today = date.today()

        if not result:
            # New IP - add to tracking table
            cursor.execute(
                "INSERT INTO ip_tracking (ip_address, request_count, last_request_date) VALUES (?, 1, ?)",
                (ip_address, today),
            )
            conn.commit()
            logger.info(f"New IP tracked: {ip_address}")
        else:
            count, last_date = result

            # Convert string date to date object if needed
            if isinstance(last_date, str):
                last_date = datetime.strptime(last_date, "%Y-%m-%d").date()

            # If it's a new day, reset the counter
            if last_date < today:
                cursor.execute(
                    "UPDATE ip_tracking SET request_count = 1, last_request_date = ? WHERE ip_address = ?",
                    (today, ip_address),
                )
                conn.commit()
                logger.info(f"Reset counter for IP: {ip_address}")
            elif count >= MAX_DAILY_REQUESTS_PER_IP:
                logger.warning(f"IP {ip_address} exceeded daily limit")
                conn.close()
                return False
            else:
                # Increment count
                cursor.execute(
                    "UPDATE ip_tracking SET request_count = request_count + 1 WHERE ip_address = ?",
                    (ip_address,),
                )
                conn.commit()

        # Check global daily limit
        cursor.execute(
            "SELECT total_count, last_date FROM global_counter WHERE counter_id = 'daily_total'"
        )
        global_result = cursor.fetchone()

        if global_result:
            global_count, global_last_date = global_result

            if isinstance(global_last_date, str):
                global_last_date = datetime.strptime(
                    global_last_date, "%Y-%m-%d"
                ).date()

            if global_last_date < today:
                cursor.execute(
                    "UPDATE global_counter SET total_count = 1, last_date = ? WHERE counter_id = 'daily_total'",
                    (today,),
                )
                conn.commit()
                logger.info("Reset global counter for new day")
            elif global_count >= MAX_TOTAL_DAILY_REQUESTS:
                logger.warning("Global daily limit reached")
                conn.close()
                return False
            else:
                cursor.execute(
                    "UPDATE global_counter SET total_count = total_count + 1 WHERE counter_id = 'daily_total'"
                )
                conn.commit()

        conn.close()
        return True

    @staticmethod
    def get_ip_remaining_requests(ip_address: str) -> int:
        """Get the number of remaining requests for an IP address"""
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT request_count, last_request_date FROM ip_tracking WHERE ip_address = ?",
            (ip_address,),
        )
        result = cursor.fetchone()

        if not result:
            conn.close()
            return MAX_DAILY_REQUESTS_PER_IP

        count, last_date = result

        # Convert string date to date object if needed
        if isinstance(last_date, str):
            last_date = datetime.strptime(last_date, "%Y-%m-%d").date()

        # If it's a new day, they have max requests
        if last_date < date.today():
            conn.close()
            return MAX_DAILY_REQUESTS_PER_IP

        conn.close()
        remaining = max(0, MAX_DAILY_REQUESTS_PER_IP - count)
        return remaining

    @staticmethod
    def get_global_remaining_requests() -> int:
        """Get the number of remaining global requests for the day"""
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()

        cursor.execute(
            "SELECT total_count, last_date FROM global_counter WHERE counter_id = 'daily_total'"
        )
        result = cursor.fetchone()

        if not result:
            # Initialize if not exists
            today = date.today()
            cursor.execute(
                "INSERT INTO global_counter (counter_id, total_count, last_date) VALUES (?, ?, ?)",
                ("daily_total", 0, today),
            )
            conn.commit()
            conn.close()
            return MAX_TOTAL_DAILY_REQUESTS

        count, last_date = result

        # Convert string date to date object if needed
        if isinstance(last_date, str):
            last_date = datetime.strptime(last_date, "%Y-%m-%d").date()

        # If it's a new day, reset the counter
        if last_date < date.today():
            conn.close()
            return MAX_TOTAL_DAILY_REQUESTS

        conn.close()
        remaining = max(0, MAX_TOTAL_DAILY_REQUESTS - count)
        return remaining

    @staticmethod
    def record_query_history(
        ip_address: str, user_query: str, sql_query: str, success: bool
    ):
        """Record a query in the history table"""
        conn = sqlite3.connect(IP_TRACKING_DB_PATH)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO query_history (ip_address, user_query, sql_query, success)
            VALUES (?, ?, ?, ?)
            """,
            (ip_address, user_query, sql_query, success),
        )

        conn.commit()
        conn.close()
        logger.info(f"Recorded query from {ip_address}: success={success}")
