import React, { useState } from "react";
import "./Header.css";

function Header({ userScore, botScore }) {
  return (
    <div className="header-section">
      <div className="headers">
        <p>ROCK</p>
        <p>PAPER</p>
        <p>SCISSORS</p>
      </div>

      <div className="scores">
        <div className="score-card">
          <p>COMPUTER</p>
          <p>SCORE</p>
          <p className="score">{userScore}</p>
        </div>
        <div className="score-card">
          <p>YOUR</p>
          <p>SCORE</p>
          <p className="score">{botScore}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
