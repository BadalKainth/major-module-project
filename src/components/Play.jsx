import React, { useEffect, useState } from "react";
import "./Play.css";
import rock from "../assets/rock.png";
import scissor from "../assets/scissor.png";
import paper from "../assets/paper.png";
import { Popover, Button, Space } from "antd";
import { calcPlayerOutcome, getBotOption } from "../utils/bot";
import Header from "./Header";

const Rules = (
  <div style={{ background: "grey", padding: 0 }}>
    <p>Rules</p>
    <p>Rock beats scissors, scissors beat paper, and paper beats rock.</p>
    <p>
      Agree ahead of time whether you'll count off “rock, paper, scissors,
      shoot” or just <br />
      “rock, paper, scissors.”
    </p>
    <p>
      Use rock, paper, scissors to settle minor decisions or simply play to pass
      the time
    </p>
    <p>
      If both players lay down the same hand, each player lays down another hand
    </p>
  </div>
);

const getOptionUI = (option, win = false) => {
  switch (option) {
    case "rock":
      return (
        <Button type="ghost" className={win ? "play-btn" : ""}>
          <img src={rock} alt="rock-logo" />
        </Button>
      );
    case "paper":
      return (
        <Button type="ghost" className="play-btn">
          <img src={paper} alt="paper-logo" />
        </Button>
      );
    case "scissor":
      return (
        <Button type="ghost" className="play-btn">
          <img src={scissor} alt="scissor-logo" />
        </Button>
      );
  }
};

function Play() {
  const [userOption, setUserOption] = useState("");
  const [botOption, setBotOption] = useState("");
  const [outcome, setOutcome] = useState("");

  const [userScore, setUserScore] = useState(
    +localStorage.getItem("userScore") || 0
  );
  const [botScore, setBotScore] = useState(
    +localStorage.getItem("botScore") || 0
  );

  const [isStart, setIsStart] = useState(false);

  const handleClick = (userOption) => {
    setIsStart(true);
    // returns "draw", "loss", "win"
    const botOption = getBotOption();

    //store in state
    setUserOption(userOption);
    setBotOption(botOption);
    const outcome = calcPlayerOutcome(userOption, botOption);
    setOutcome(outcome);
    //TODO: store outcome
    switch (outcome) {
      case "win":
        setUserScore(userScore + 1);
        break;
      case "lose":
        setBotScore(botScore + 1);
        break;
      case "draw":
        setUserScore(userScore + 1);
        setBotScore(botScore + 1);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem("userScore", userScore);
    localStorage.setItem("botScore", botScore);
  }, [userScore, botScore]);

  const handleClear = () => {
    localStorage.setItem("userScore", 0);
    localStorage.setItem("botScore", 0);
    setUserScore(0);
    setBotScore(0);
    setIsStart(false);
  };

  return (
    <>
      <Header userScore={userScore} botScore={botScore} />
      {!isStart ? (
        <main className="game-section">
          <div className="play-btns">
            <div className="top-row-btns">
              <Button
                type="ghost"
                className="play-btn"
                onClick={() => {
                  handleClick("rock");
                }}
              >
                <img src={rock} alt="rock-logo" className="img" />
              </Button>
              <Button
                type="ghost"
                className="play-btn"
                onClick={() => {
                  handleClick("paper");
                }}
              >
                <img src={paper} alt="paper-logo" className="img" />
              </Button>
            </div>
            <div>
              <Button
                type="ghost"
                className="play-btn"
                onClick={() => {
                  handleClick("scissor");
                }}
              >
                <img src={scissor} alt="scissor-logo" className="img" />
              </Button>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <div className="result-section">
            <div className="result">
              <div>
                {getOptionUI(userOption, outcome == "win" ? true : false)}
              </div>
              <div>
                {outcome == "win" ? (
                  <h4 className="heading1">YOU WIN!</h4>
                ) : null}
                {outcome == "lose" ? (
                  <h4 className="heading1">YOU LOSE!</h4>
                ) : null}
                {outcome == "draw" ? <h4 className="heading1">DRAW!</h4> : null}
                <h4 className="heading2">AGAINST PC</h4>

                <Button
                  className="again-btn"
                  onClick={() => {
                    setIsStart(false);
                  }}
                >
                  Play Again
                </Button>
              </div>
              <div>
                {getOptionUI(botOption, outcome == "lose" ? true : false)}
              </div>
            </div>
          </div>
        </main>
      )}
      <Space>
        <Button className="restart-btn" onClick={handleClear}>
          Restart
        </Button>
        <Popover content={Rules} className="popover" trigger="click">
          <Button className="rules-btn">Rules</Button>
        </Popover>
      </Space>
    </>
  );
}

export default Play;
