import re
import sqlparse
from utils.logger import logger


class SQLValidator:
    """
    SQL Validator to prevent SQL injection attacks and ensure query safety.
    This class validates SQL queries for potentially harmful patterns and limits complexity.
    """

    @staticmethod
    def validate(sql_query: str, max_subquery_depth: int = 2) -> tuple[bool, str]:
        """
        Validates a SQL query for potential injection patterns and complexity.

        Args:
            sql_query: The SQL query to validate
            max_subquery_depth: Maximum allowed depth of subqueries

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
            r"UNION\s+ALL\s+SELECT",
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
                return False, f"Potentially unsafe SQL pattern detected"

        # Check query type - only allow SELECT for read-only operations
        # Parse the SQL query
        try:
            parsed = sqlparse.parse(sql_query)
            for statement in parsed:
                if statement.get_type().upper() != "SELECT":
                    logger.warning(
                        f"Non-SELECT statement detected: {statement.get_type()}"
                    )
                    return False, "Only SELECT statements are allowed"
        except Exception as e:
            logger.error(f"Error parsing SQL query: {str(e)}")
            return False, f"SQL parsing error: {str(e)}"

        # Check for excessive subquery nesting
        is_valid, error_message = SQLValidator.check_subquery_depth(
            sql_query, max_subquery_depth
        )
        if not is_valid:
            return False, error_message

        # Check for parameterizable values and warn if found
        SQLValidator._check_parameterizable_values(sql_query)

        # All checks passed
        return True, ""

    @staticmethod
    def check_subquery_depth(sql_query: str, max_depth: int = 2) -> tuple[bool, str]:
        """
        Checks if a SQL query has nested subqueries beyond a certain depth

        Args:
            sql_query: The SQL query to check
            max_depth: Maximum allowed nesting depth for subqueries

        Returns:
            tuple: (is_valid, error_message)
        """
        # Count opening and closing parentheses to estimate subquery depth
        depth = 0
        max_reached = 0

        for char in sql_query:
            if char == "(":
                depth += 1
                max_reached = max(max_reached, depth)
            elif char == ")":
                depth = max(0, depth - 1)  # Avoid negative depth on unbalanced queries

        # A significant depth could indicate excessive nesting
        if max_reached > max_depth + 1:  # +1 to account for regular function calls
            return (
                False,
                f"Query contains excessive nesting (depth: {max_reached}, max allowed: {max_depth + 1})",
            )

        # Count explicit subquery keywords
        subquery_count = len(re.findall(r"\(\s*SELECT", sql_query, re.IGNORECASE))
        if subquery_count > max_depth:
            return (
                False,
                f"Query contains too many subqueries ({subquery_count}, max allowed: {max_depth})",
            )

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
