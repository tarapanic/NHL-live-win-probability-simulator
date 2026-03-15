function calculateWinProbability(gameState) {
  const scoreDiff = gameState.homeScore - gameState.awayScore;
  const shotsDiff = gameState.homeShots - gameState.awayShots;

  let probability = 0.5;
  // score impact
  probability += scoreDiff * 0.12;

  // shot differential impact
  probability += shotsDiff * 0.002;

  // time remaining impact
  probability -= gameState.timeRemaining * 0.003;

  // power play bonus
  if (gameState.powerPlayTeam === gameState.homeTeam) {
    probability += 0.03;
  }

  if (gameState.powerPlayTeam === gameState.awayTeam) {
    probability -= 0.03;
  }

  // clamp between 0 and 1
  probability = Math.max(0, Math.min(1, probability));

  return probability;
}
module.exports = calculateWinProbability;