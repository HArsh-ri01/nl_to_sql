import requests
import json
import sys


def test_process_query(query="What is the highest score in IPL?"):
    """Test the process_query endpoint with a simple query"""
    print(f"Testing with query: {query}")
    try:
        response = requests.post(
            "http://localhost:8000/process_query/", data={"user_query": query}
        )

        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {response.headers}")

        try:
            print(f"Response JSON: {json.dumps(response.json(), indent=2)}")
        except:
            print(f"Raw Response: {response.text}")

        return response
    except Exception as e:
        print(f"Error: {str(e)}")
        return None


if __name__ == "__main__":
    # If a query is provided as command line argument, use it
    query = sys.argv[1] if len(sys.argv) > 1 else "What is the highest score in IPL?"
    test_process_query(query)
