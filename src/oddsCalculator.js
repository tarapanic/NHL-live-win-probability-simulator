function probabilityToAmericanOdds(probability) {
  if (probability === 0.5) return 100;

  if (probability > 0.5) {
    return Math.round(-(probability / (1 - probability)) * 100);
  }
  return Math.round(((1 - probability) / probability) * 100);
}

function applySportsbookMargin(probability, margin = 0.06) {
  return probability * (1 + margin);
}

module.exports = {
  probabilityToAmericanOdds,
  applySportsbookMargin
};