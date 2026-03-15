function simulateEvent(gameState, event) {
  switch (event) {
    case "HOME_GOAL":
      gameState.homeScore += 1;
      break;

    case "AWAY_GOAL":
      gameState.awayScore += 1;
      break;

    case "HOME_SHOT":
      gameState.homeShots += 1;
      break;

    case "AWAY_SHOT":
      gameState.awayShots += 1;
      break;

    case "HOME_POWERPLAY":
      gameState.powerPlayTeam = gameState.homeTeam;
      break;

    case "AWAY_POWERPLAY":
      gameState.powerPlayTeam = gameState.awayTeam;
      break;

    case "EVEN_STRENGTH":
      gameState.powerPlayTeam = null;
      break;
  }
}

function getRandomEvent(gameState) {
  const scoreDiff = gameState.homeScore - gameState.awayScore;

  let homeWeight = 0.5;
  let awayWeight = 0.5;

  // if home team is losing, increase pressure
  if (scoreDiff < 0) {
    homeWeight += 0.1;
    awayWeight -= 0.1;
  }

  // if away team is losing, increase pressure
  if (scoreDiff > 0) {
    awayWeight += 0.1;
    homeWeight -= 0.1;
  }
  const r = Math.random();

  if (r < homeWeight * 0.6) return "HOME_SHOT";
  if (r < (homeWeight * 0.6) + (awayWeight * 0.6)) return "AWAY_SHOT";

  if (r < 0.8) return "HOME_GOAL";
  if (r < 0.9) return "AWAY_GOAL";

  return "EVEN_STRENGTH";
}
module.exports = { simulateEvent, getRandomEvent };