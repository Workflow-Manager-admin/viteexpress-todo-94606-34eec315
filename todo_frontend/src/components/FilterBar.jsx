import React from "react";

// PUBLIC_INTERFACE
function FilterBar({ filter, setFilter, colors }) {
  /** Filter control bar for All/Completed/Pending. */
  const filters = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 22, justifyContent: "center" }}>
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          style={{
            background: filter === f.value ? colors.primary : "#f6f6f6",
            color: filter === f.value ? "#fff" : colors.secondary,
            border: `1.5px solid ${colors.primary}`,
            borderRadius: 6,
            padding: "0.5em 1.2em",
            fontSize: "1em",
            fontWeight: filter === f.value ? 600 : 400,
            cursor: filter === f.value ? "default" : "pointer",
            transition: "all 0.2s",
            outline: "none",
          }}
          tabIndex={0}
          aria-pressed={filter === f.value}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
