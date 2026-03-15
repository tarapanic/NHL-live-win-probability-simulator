const gameState = require("./gameState");
const calculateWinProbability = require("./probabilityModel");
const { simulateEvent, getRandomEvent } = require("./eventSimulator");
const { probabilityToAmericanOdds, applySportsbookMargin } = require("./oddsCalculator");
const chalk = require("chalk");

let probabilityHistory = [];

function printDivider() {
  console.log("\n----------------------------------------");
}

function printProbabilities() {
  const winProb = calculateWinProbability(gameState);
  const awayProb = 1 - winProb;

const marginHomeProb = applySportsbookMargin(winProb);
const marginAwayProb = applySportsbookMargin(awayProb);

const homeOdds = probabilityToAmericanOdds(marginHomeProb);
const awayOdds = probabilityToAmericanOdds(marginAwayProb);

  printDivider();

  console.log("Current Game State:");
  console.log(`${gameState.homeTeam} ${gameState.homeScore} - ${gameState.awayScore} ${gameState.awayTeam}`);
  console.log(`Shots: ${gameState.homeShots} - ${gameState.awayShots}`);
  console.log(`Time Remaining: ${gameState.timeRemaining} minutes`);

  console.log("\nWin Probabilities:");
  console.log(chalk.green(`${gameState.homeTeam}: ${(winProb * 100).toFixed(1)}%`));
  console.log(chalk.red(`${gameState.awayTeam}: ${(awayProb * 100).toFixed(1)}%`));

  console.log("\nSportsbook Odds (6% Margin):");
  console.log(`${gameState.homeTeam}: ${homeOdds > 0 ? "+" : ""}${homeOdds}`);
  console.log(`${gameState.awayTeam}: ${awayOdds > 0 ? "+" : ""}${awayOdds}`);

  probabilityHistory.push(winProb);
}

function runSimulation() {
  console.log("Starting Live Game Simulation...\n");

  for (let i = 0; i < 10; i++) {

    const event = getRandomEvent(gameState);

    if (event.includes("GOAL")) {
        console.log(chalk.bgRed.white(`GOAL EVENT: ${event}`));
        } else {
        console.log(chalk.yellow(`Event: ${event}`));
    }

    simulateEvent(gameState, event);
    printProbabilities();
    gameState.timeRemaining = Math.max(0, gameState.timeRemaining - 1);
  }

    console.log("\nFinal Game Result");
    console.log(
    chalk.blue(
        `${gameState.homeTeam} ${gameState.homeScore} - ${gameState.awayScore} ${gameState.awayTeam}`
    )
    );

    const finalProb = calculateWinProbability(gameState);
    console.log(
    chalk.magenta(`Final Win Probability: ${(finalProb * 100).toFixed(1)}%`)
    );
}

function printProbabilityChart() {
  console.log("\nWin Probability Timeline\n");
  probabilityHistory.forEach((prob, index) => {

    const percent = (prob * 100).toFixed(1);
    const barLength = Math.round(prob * 20);
    const bar = "█".repeat(barLength);
    console.log(`Event ${index + 1} | ${percent}% ${bar}`);
  });
}
runSimulation();
printProbabilityChart();