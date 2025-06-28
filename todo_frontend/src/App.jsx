import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import NewTaskInput from "./components/NewTaskInput";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

// Color palette for minimalistic theme
const colors = {
  primary: "#1976d2",
  secondary: "#424242",
  accent: "#ffb300",
  bg: "#ffffff",
  text: "#213547",
};

/**
 * Get the API endpoint base (from .env or default)
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

/**
 * Helper function for standardized API error parsing
 */
function parseApiError(error) {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  return "Unknown error";
}

// PUBLIC_INTERFACE
function App() {
  /** Main To-Do App component (wired to backend API).
   *  Manages task list, CRUD actions, filters, loading & error states.
   */
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks from backend API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks((Array.isArray(data) ? data : (data.tasks ?? [])));
    } catch (err) {
      setError(parseApiError(err));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add a new task to the backend
  const addTask = async (taskText) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      await fetchTasks();
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Toggle completion status
  const toggleComplete = async (taskId, completed) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      await fetchTasks();
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      await fetchTasks();
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Compute filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return !!task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
      data-testid="main-wrapper"
    >
      <Header colors={colors} />
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 24px 0 rgba(32,48,114,0.08)",
          padding: "2rem 1.5rem",
          margin: "2rem 0",
        }}
      >
        <NewTaskInput
          colors={colors}
          onAdd={addTask}
          disabled={loading}
        />
        <FilterBar filter={filter} setFilter={setFilter} colors={colors} />
        {error && (
          <div
            style={{
              color: "#d32f2f",
              background: "#fff3f4",
              border: "1px solid #ffd1d1",
              padding: "0.7em",
              borderRadius: 10,
              marginBottom: 12,
              fontSize: "1em",
              textAlign: "center",
              fontWeight: 500,
            }}
            role="alert"
          >
            {error}
          </div>
        )}
        <TaskList
          tasks={filteredTasks}
          colors={colors}
          onToggle={toggleComplete}
          onDelete={deleteTask}
          loading={loading}
        />
        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0", color: "#999" }}>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
