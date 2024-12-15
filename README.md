## Mastermind Site Overview

The Mastermind site serves as a way to play the Mastermind code-breaking game. There are 3 pre-set difficulty levels (easy, medium, hard), options to choose the range of digits in the code (i.e. 0-4 -> 0404), as well as the number of lives (max 20). Users will be able to receive feedback upon each guess, generate a hint or view previous guesses.

**Check out the Website: Deployment Coming soon!**

## Additional Feautures
- Customizable difficulties (easy code = 4, medium code = 6, hard=8). 
- Users are able to choose from what range they would like the numbers to be generated from (i.e: 0-4 -> 0404). 
- Users are able to customize how many lives may be played (no less than 3 or more than 20). 
- Option to login/create a user profile that can save the games played and allow you to continue unfinished games, and view your past games data. 
- Ability to see previous guesses, instructions and feedback of guess. 
- Leaderboard that displays the top 10 players based off of most games won. 
- Ability for a user to delete a game or user account. 
- Ability to view a hint

Note: There is logic in the frontend to mitigate bad inputs, as well as logic on the backend to verify inputs and deals with errors.

## How to Run:
### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (LTS version recommended)
- Yarn (Package manager)
- Backend server running at http://localhost:5000 (or update the URL accordingly in the .env file)
  

Create a .env file in the mastermind folder and add the following line:
```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```
Start the React app:
```bash
yarn start
```
### Future Updates
I would like to extend to realtime multi-player and include a timer that visually displays.
