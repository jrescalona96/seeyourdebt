import React, { useState } from "react";
import Debts from "./components/debts";
import NavBar from "./components/navBar";
import "./sass/App.scss";
import { useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("lightTheme");

  useEffect(() => {
    document.getElementById("root").classList.add(theme);
  });

  const handlesetTheme = () => {
    const newTheme = theme === "darkTheme" ? "lightTheme" : "darkTheme";
    document.getElementById("root").classList.remove(theme);
    document.getElementById("root").classList.add(newTheme);
    setTheme(newTheme);
  };

  return (
    <React.Fragment>
      <NavBar
        title="DebtCounter"
        theme={theme}
        doSetTheme={() => handlesetTheme()}
      />
      <main className={`container-fluid ${theme}`}>
        <Debts theme={theme} />
      </main>
    </React.Fragment>
  );
}

export default App;
