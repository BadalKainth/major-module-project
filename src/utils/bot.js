const options = ["rock", "paper", "scissor"];
const getBotOption = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  return options[randomNumber];
};

// whether user wins, lose, or draw
const calcPlayerOutcome = (userOption, botOption) => {
  if (botOption == userOption) {
    return "draw";
  }
  switch (userOption) {
    case "rock":
      if (botOption == "scissor") {
        return "win";
      } else {
        return "lose";
      }
    case "paper":
      if (botOption == "rock") {
        return "win";
      } else {
        return "lose";
      }
    case "scissor":
      if (botOption == "paper") {
        return "win";
      } else {
        return "lose";
      }

    default:
      return "draw";
  }
};

export { getBotOption, calcPlayerOutcome };
