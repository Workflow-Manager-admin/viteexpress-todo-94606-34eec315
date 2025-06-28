import React from "react";

// PUBLIC_INTERFACE
function NewTaskInput({ colors }) {
  /** Input bar for adding new tasks (UI only). */
  return (
    <form style={{ display: "flex", gap: 8, marginBottom: 20 }} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Add a new task..."
        aria-label="Add new task"
        style={{
          flex: 1,
          padding: "0.8em 1em",
          fontSize: "1em",
          border: `1.5px solid ${colors.secondary}`,
          borderRadius: 8,
          outline: "none",
          background: "#fafbfc",
        }}
        disabled
        value=""
        onChange={() => {}}
      />
      <button
        type="submit"
        style={{
          background: colors.accent,
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          padding: "0 1.3em",
          fontSize: "1em",
          cursor: "not-allowed",
          opacity: 0.7,
        }}
        disabled
      >
        Add
      </button>
    </form>
  );
}

export default NewTaskInput;
