const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Airflow connection details
const AIRFLOW_URL = "http://127.0.0.1:8080";
const AIRFLOW_USERNAME = "admin";
const AIRFLOW_PASSWORD = "admin";
const DAG_ID = "api_triggered_dag";

// POST /trigger-dag
// This endpoint triggers the Airflow DAG
app.post("/trigger-dag", async (req, res) => {
  try {
    const { user_id, action } = req.body;

    console.log(`Triggering DAG for user_id: ${user_id}, action: ${action}`);

    // Call Airflow REST API
    const response = await axios.post(
      `${AIRFLOW_URL}/api/v2/dags/${DAG_ID}/dagRuns`,
      {
        logical_date: new Date().toISOString(),
        conf: {
          user_id,
          action,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(
      `DAG triggered successfully! Run ID: ${response.data.dag_run_id}`,
    );

    res.json({
      success: true,
      message: "DAG triggered successfully!",
      dag_run_id: response.data.dag_run_id,
    });
  } catch (error) {
    console.error(
      "Failed to trigger DAG:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      success: false,
      message: "Failed to trigger DAG",
      error: error.response?.data || error.message,
    });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
  console.log(
    `POST http://localhost:${PORT}/trigger-dag to trigger the Airflow DAG`,
  );
});
