import React from "react";
import Debts from "./components/debts";
import NavBar from "./components/navBar";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar title="DebtCounter" />
      <main className="container-fluid">
        <Debts />
      </main>
    </React.Fragment>
  );
}

export default App;
