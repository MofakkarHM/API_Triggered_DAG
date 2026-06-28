# API Triggered Airflow DAG

A project that demonstrates triggering an Apache Airflow DAG via REST API from a Node.js Express backend.

## How it works

1. A client sends a POST request to the Node.js backend
2. The backend calls Airflow's REST API
3. Airflow triggers the DAG with the provided data (conf)
4. The DAG processes the data through 3 tasks

## Flow

Client -> POST /trigger-dag -> Node.js Backend -> Airflow REST API -> DAG triggered -> Tasks run

## Project Structure

```text
API_Triggered_DAG/
├── airflow/
│   └── dags/
│       └── api_triggered_dag.py   # Airflow DAG (schedule=None)
└── backend/
    └── index.js                   # Express server
```

## DAG Tasks

| Task | Description |
|---|---|
| receive_input | Reads conf data sent from the API call |
| process | Processes the received data |
| respond | Simulates sending a response or notification |

## Concepts Demonstrated

- schedule=None — DAG only runs when triggered externally
- Airflow REST API — triggering DAGs programmatically
- conf — passing dynamic data to DAGs via API
- TaskFlow API — modern @task and @dag decorators
- XCom — automatic data passing between tasks
- Node.js + Express — backend that calls Airflow REST API

## Tech Stack

- Apache Airflow 3
- Astro CLI
- Node.js + Express
- Docker

## Setup

### Airflow
1. Install Astro CLI
2. cd airflow
3. Run: astro dev start
4. Go to http://localhost:8080

### Node.js Backend
1. cd backend
2. Run: npm install
3. Run: node index.js
4. Server runs at http://localhost:3000

## API Usage

Trigger the DAG:

POST http://localhost:3000/trigger-dag
Content-Type: application/json

{
    "user_id": 123,
    "action": "generate_report"
}

Response:

{
    "success": true,
    "message": "DAG triggered successfully!",
    "dag_run_id": "manual__2026-06-28T09:05:17.066931+00:00"
}
