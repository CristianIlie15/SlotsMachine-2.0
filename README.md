# Slot Machine 🎰

A simple web-based slot machine game built with JavaScript, HTML, and CSS. This project features a fully functional slot machine with fruit symbols, payouts, betting controls, sound effects, and a double-or-nothing mini-game.

---

## Features

- **Dynamic Slot Grid**: 15 symbols arranged in a 3x5 grid with randomized spins.
- **Multiple Fruit Symbols**: Includes Cherry, Lemon, Orange, Plum, Scatter, Watermelon, Grape, and Seven — each with different payout tiers.
- **Betting System**: Adjust your bet amount and manage your balance.
- **Win Calculation**: Calculates wins based on paylines and scatter symbols.
- **Double Game**: Chance to double winnings by guessing red or black cards (up to 5 streaks).
- **Sound Effects**: Sounds for spins, wins, big wins, losing, and betting changes.
- **Responsive UI**: Simple but clear UI displaying balance, bets, winnings, and controls.

---

## How to Play

1. Adjust your bet using the "+" and "-" buttons.
2. Press "Spin" to play the slot machine.
3. Wins are calculated based on matching symbols on paylines.
4. If you win, you can choose to double your winnings by guessing red or black.
5. Continue playing until your balance runs out.

---

## Technology Stack

- Vanilla JavaScript for game logic
- HTML5 and CSS3 for UI and layout

---

## Project Structure

- `index.html` – main HTML page with UI elements
- `style.css` – styles for the game
- `slotLogic.js` – JavaScript file containing all game logic and event handlers
- `img/` – folder containing fruit and symbol images
- `sounds/` – folder containing sound effect files

---

## Future Improvements

- Implement a stack/queue system to track the last 5 double-game cards.
- Improve UI/UX with animations and better graphics.
- Add persistent state saving using localStorage or backend.
- Add more game modes or bonus rounds.

---

## How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/YourUsername/SlotsMachine-2.0.git
