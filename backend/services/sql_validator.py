import re
import sqlparse
from utils.logger import logger


class SQLValidator:
    """
    SQL Validator to prevent SQL injection attacks and ensure query safety.
    This class validates SQL queries for potentially harmful patterns and limits complexity.
    """

    @staticmethod
    def validate(sql_query: str, max_subquery_depth=None) -> tuple[bool, str]:
        """
        Validates a SQL query for potential injection patterns and complexity.

        Args:
            sql_query: The SQL query to validate
            max_subquery_depth: Parameter kept for backward compatibility but no longer used

        Returns:
            tuple: (is_valid, error_message)
        """
        # Normalize the query for consistent pattern matching
        normalized_query = SQLValidator._normalize_query(sql_query)

        # Check for suspicious patterns that could indicate SQL injection
        suspicious_patterns = [
            r";\s*DROP\s+",
            r";\s*DELETE\s+",
            r";\s*UPDATE\s+",
            r";\s*INSERT\s+",
            r";\s*ALTER\s+",
            r";\s*CREATE\s+",
            r";\s*TRUNCATE\s+",
            r"--\s*",  # SQL comments that might be used to comment out code
            r"/\*.*?\*/",  # Block comments
            r"EXEC\s+",
            r"EXECUTE\s+",
            r"INTO\s+OUTFILE",
            r"INTO\s+DUMPFILE",
            r"WAITFOR\s+DELAY",
            r"xp_cmdshell",
            r"sp_executesql",
            r"DECLARE\s+",
            r"SLEEP\s*\(",
            r"BENCHMARK\s*\(",
            r"LOAD_FILE\s*\(",
        ]

        for pattern in suspicious_patterns:
            if re.search(pattern, normalized_query, re.IGNORECASE):
                logger.warning(
                    f"Potential SQL injection detected: {pattern} in query: {sql_query}"
                )
                return (
                    False,
                    f"I don't answer to this question, please try again with a different question",
                )

        # Special check for UNION clauses - they're common in legitimate SQL but also in SQL injection
        # We'll verify that they're being used in a reasonable way by checking if they appear more than a certain number of times
        union_count = len(re.findall(r"\bUNION\b", normalized_query, re.IGNORECASE))
        if union_count > 5:  # Arbitrary threshold - adjust based on your needs
            logger.warning(
                f"Too many UNION clauses detected ({union_count}) which may indicate SQL injection"
            )
            return False, "I don't answer to this question, please try again with a different question"

        # Check for suspicious UNION usage patterns that indicate injection
        suspicious_union_patterns = [
            r"UNION\s+SELECT\s+NULL",  # Common in SQL injection probing
            r"UNION\s+SELECT\s+1,2,3",  # Common in SQL injection probing
            r"UNION\s+SELECT\s+@@version",  # Version probing
        ]

        for pattern in suspicious_union_patterns:
            if re.search(pattern, normalized_query, re.IGNORECASE):
                logger.warning(f"Suspicious UNION usage detected: {pattern}")
                return False, "I don't answer to this question, please try again with a different question"

        # Parse the SQL query
        try:
            parsed = sqlparse.parse(sql_query)
            for statement in parsed:
                # Special handling for queries that begin with WITH
                if statement.get_type().upper() != "SELECT":
                    # Check if this is a WITH query (CTE) which sqlparse sometimes misidentifies
                    if sql_query.upper().strip().startswith("WITH "):
                        # Verify it eventually contains a SELECT statement
                        if re.search(r"\bSELECT\b", sql_query, re.IGNORECASE):
                            # This is a WITH query that contains SELECT, allow it
                            logger.info("WITH query with SELECT detected, allowing")
                            continue

                    logger.warning(
                        f"Non-SELECT statement detected: {statement.get_type()}"
                    )
                    return False, "I don't answer to this question, please try again with a different question"
        except Exception as e:
            # log sql query also
            logger.warning(f"Error parsing SQL query: {sql_query}, Error: {str(e)}")
            logger.error(f"Error parsing SQL query: {str(e)}")
            return False, f"Try again later: {str(e)}"

        # Check for parameterizable values and warn if found
        SQLValidator._check_parameterizable_values(sql_query)

        # All checks passed
        return True, ""

    @staticmethod
    def _normalize_query(sql_query: str) -> str:
        """
        Normalize a SQL query by removing extra whitespace for consistent pattern matching
        """
        return " ".join(sql_query.split())

    @staticmethod
    def _check_parameterizable_values(sql_query: str) -> None:
        """
        Identifies values in a query that could be parameterized for better security.
        This is a heuristic check that logs suggestions but doesn't block queries.

        Args:
            sql_query: The SQL query to check
        """
        # Look for string literals and numeric literals that could be parameterized
        string_literal_pattern = r"'[^']*'"
        string_literals = re.findall(string_literal_pattern, sql_query)

        if (
            len(string_literals) > 3
        ):  # If there are multiple string literals, suggest parameterization
            logger.info(
                f"Query contains {len(string_literals)} string literals that could be parameterized"
            )
