import React from "react";

// PUBLIC_INTERFACE
function TaskList({ tasks, colors }) {
  /** Task list rendering with placeholder data. */
  if (!tasks.length) {
    return (
      <div style={{ textAlign: "center", color: colors.secondary, marginTop: 28 }}>
        No tasks to show.
      </div>
    );
  }
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75em 0.5em",
            borderBottom: "1px solid #eee",
          }}
        >
          <span
            style={{
              flex: 1,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? colors.secondary : colors.text,
              fontSize: "1.05em",
              letterSpacing: 0.4,
              opacity: task.completed ? 0.67 : 1,
              transition: "all 0.2s",
            }}
          >
            {task.text}
          </span>
          <span
            title={task.completed ? "Completed" : "Pending"}
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: task.completed ? colors.primary : "#bbb",
              display: "inline-block",
              marginLeft: 13,
              opacity: task.completed ? 1 : 0.4,
              boxShadow: task.completed ? `0 0 6px ${colors.primary}40` : undefined,
            }}
          ></span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
