import React, { useState } from "react";

// PUBLIC_INTERFACE
function NewTaskInput({ colors, onAdd, disabled }) {
  /** Input bar for adding new tasks (with backend integration via onAdd prop). */
  const [input, setInput] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (onAdd) {
      await onAdd(input);
      setInput("");
    }
  };

  return (
    <form style={{ display: "flex", gap: 8, marginBottom: 20 }} onSubmit={submit} autoComplete="off">
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
        disabled={disabled}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={100}
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
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
        disabled={disabled || !input.trim()}
        aria-disabled={disabled || !input.trim()}
      >
        Add
      </button>
    </form>
  );
}

export default NewTaskInput;
