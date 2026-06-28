import pendulum
from airflow.sdk import dag, task


@dag(
    dag_id="api_triggered_dag",
    schedule=None,  # No schedule — only triggered via API call
    start_date=pendulum.datetime(2024, 1, 1, tz="Asia/Dhaka"),
    catchup=False,
    doc_md="""
    ## API Triggered DAG
    This DAG is triggered by an external API call from a Node.js backend.
    It receives data via `conf` and processes it.
    
    ### Example API call:
    POST /trigger-dag
    {
        "user_id": 123,
        "action": "generate_report"
    }
    """,
)
def api_triggered_dag():

    @task
    def receive_input(**context):
        """Read the conf data sent from the Node.js API call."""
        conf = context["params"]
        print(f"DAG triggered with conf: {conf}")

        user_id = conf.get("user_id", "unknown")
        action = conf.get("action", "unknown")

        print(f"User ID: {user_id}")
        print(f"Action: {action}")

        return {"user_id": user_id, "action": action}

    @task
    def process(data: dict):
        """Simulate processing the received data."""
        print(f"Processing request for user {data['user_id']}...")
        print(f"Performing action: {data['action']}")
        result = f"Action '{data['action']}' completed for user {data['user_id']}"
        print(result)
        return result

    @task
    def respond(result: str):
        """Simulate sending a response or notification."""
        print(f"Pipeline finished! Result: {result}")

    # Pipeline order
    input_data = receive_input()
    processed = process(input_data)
    respond(processed)


api_triggered_dag()