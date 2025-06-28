import React from "react";

// PUBLIC_INTERFACE
function Header({ colors }) {
  /** App heading component. */
  return (
    <header style={{ marginBottom: "1.5rem", textAlign: "center" }}>
      <h1
        style={{
          color: colors.primary,
          fontSize: "2.2rem",
          fontWeight: "700",
          margin: 0,
          letterSpacing: 1,
        }}
      >
        To-Do List
      </h1>
    </header>
  );
}

export default Header;
