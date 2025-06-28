import React from "react";

// PUBLIC_INTERFACE
function TaskList({ tasks, colors, onToggle, onDelete, loading }) {
  /** Task list rendering with backend-linked actions for complete/delete. */
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
            gap: 6,
            opacity: loading ? 0.6 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <button
            aria-label={`Mark as ${task.completed ? "pending" : "completed"}`}
            title={task.completed ? "Undo complete" : "Mark completed"}
            onClick={() => onToggle && onToggle(task.id, task.completed)}
            style={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              border: `2px solid ${task.completed ? colors.primary : "#bbb"}`,
              background: task.completed
                ? colors.primary
                : "#fafbfc",
              marginRight: 13,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.18s",
              boxShadow: task.completed ? `0 0 6px ${colors.primary}26` : undefined,
              cursor: "pointer",
              outline: "none",
            }}
            disabled={loading}
          >
            {task.completed ? (
              <svg width={13} height={13} viewBox="0 0 17 17">
                <polyline
                  points="4,9 8,13 13,5"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: 2.2,
                    strokeLinecap: "round"
                  }}
                />
              </svg>
            ) : (
              ""
            )}
          </button>
          <span
            style={{
              flex: 1,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? colors.secondary : colors.text,
              fontSize: "1.05em",
              letterSpacing: 0.4,
              opacity: task.completed ? 0.67 : 1,
              transition: "all 0.18s",
              userSelect: "text",
            }}
          >
            {task.text}
          </span>
          <button
            aria-label="Delete task"
            title="Delete"
            style={{
              border: "none",
              background: "none",
              color: "#db3131",
              marginLeft: 4,
              padding: 7,
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 5,
              opacity: 0.7,
              transition: "background 0.16s",
            }}
            disabled={loading}
            onClick={() => onDelete && onDelete(task.id)}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
