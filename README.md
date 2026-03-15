# NHL Live Win Probability Simulator

A Node.js simulation tool that models live NHL game outcomes and calculates win probabilities dynamically as in-game events occur. The project demonstrates how sportsbooks and trading teams estimate win probabilities and converts them into betting odds during live games.

## Features

- Live NHL game simulation with event-driven updates  
- Dynamic win probability calculation based on:
  - score differential
  - shot differential
  - time remaining
  - power play status  

- Conversion of win probabilities into sportsbook-style American betting odds  
- Sportsbook margin (vig) simulation to replicate real betting markets  
- Randomized weighted event engine simulating goals, shots, and penalties  
- Probability timeline visualization showing how win probability evolves during a game  

---

## Example Output
Starting Live Game Simulation...

Event: HOME_SHOT

Current Game State:
Leafs 3 - 2 Bruins
Shots: 29 - 24
Time Remaining: 7 minutes

Win Probabilities:
Leafs: 64.1%
Bruins: 35.9%

Sportsbook Odds (6% Margin):
Leafs: -178
Bruins: +178

Win Probability Timeline

Event 1 | 63.4% ████████████  
Event 2 | 61.2% ███████████  
Event 3 | 68.5% █████████████  