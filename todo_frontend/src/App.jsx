import React, { useState } from "react";
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

// Example placeholder data
const placeholderTasks = [
  { id: 1, text: "Finish React setup", completed: false },
  { id: 2, text: "Style components", completed: true },
  { id: 3, text: "Implement backend API", completed: false }
];

// PUBLIC_INTERFACE
function App() {
  /** Main To-Do App component (UI only, no backend calls yet).
   *  Manages task list & filter state.
   */
  const [tasks] = useState(placeholderTasks);
  const [filter, setFilter] = useState("all");

  // Compute filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
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
        <NewTaskInput colors={colors} />
        <FilterBar filter={filter} setFilter={setFilter} colors={colors} />
        <TaskList tasks={filteredTasks} colors={colors} />
      </div>
    </div>
  );
}

export default App;
