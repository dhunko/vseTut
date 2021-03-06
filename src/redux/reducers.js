import { NEXT_TURN, RESET_GAME } from "./actionTypes";

const initialState = {
    gameField: [[,,,],[,,,],[,,,]],
    winner: undefined,
    nextPlayer: 'X',
    gamesHistory: new Array(),
    winnigField: ''
};

function todos(state = initialState, action) {
  let winner3x3 = (someArr) => {
    if (someArr[0][0]!== undefined) {
      if (someArr[0][0] == someArr[1][0] && someArr[1][0] == someArr[2][0]) return someArr[0][0];
      if (someArr[0][0] == someArr[0][1] && someArr[0][1] == someArr[0][2]) return someArr[0][0];
      if (someArr[0][0] == someArr[1][1] && someArr[1][1] == someArr[2][2]) return someArr[0][0];
    }
    if (someArr[0][2]!== undefined) {
      if (someArr[0][2] == someArr[1][2] && someArr[1][2] == someArr[2][2]) return someArr[0][2];
      if (someArr[0][2] == someArr[1][1] && someArr[1][1] == someArr[2][0]) return someArr[0][2];
    }
    if (someArr[0][1]!== undefined && someArr[0][1] == someArr[1][1] && someArr[1][1] == someArr[2][1]) {
      return someArr[0][1];
    }
    if (someArr[1][0]!== undefined && someArr[1][0] == someArr[1][1] && someArr[1][1] == someArr[1][2]) {
      return someArr[1][0];
    }
    if (someArr[2][0]!== undefined && someArr[2][0] == someArr[2][1] && someArr[2][1] == someArr[2][2]) {
      return someArr[2][0];
    }
    
    return undefined;
   },
  history = (history, winner, field) => {
    let historyArr = [...history],
    date = new Date();
    historyArr.push({winningDate: date,
                     winnerIs: ' winner: ' +  winner,
                     winnigField: field
                    });
    return historyArr;
  };


  switch (action.type) {
    case NEXT_TURN: {
      if (winner3x3(action.arr) !== undefined) {
        if (state.nextPlayer == 'X') {
          return {
              ...state,
              gameField: action.arr,
              nextPlayer: 'O',
              winner: 'X',
              gamesHistory: history(state.gamesHistory, state.nextPlayer, action.arr)
            } 
        } else {
            return {
              ...state,
              gameField: action.arr,
              nextPlayer: 'X',
              winner: 'O',
              gamesHistory: history(state.gamesHistory, state.nextPlayer, action.arr)
            } 
        }
      } else {
        if (state.nextPlayer == 'X') {
            return {
                ...state,
                gameField: action.arr,
                nextPlayer: 'O'
            } 
        } else {
            return {
                ...state,
                gameField: action.arr,
                nextPlayer: 'X'
            } 
        }
      }
    }
    case RESET_GAME: {
      return {
        ...state,
        gameField: [[,,,],[,,,],[,,,]],
        nextPlayer: 'X',
        winner: undefined
      }
    }
    default:
      return state;
  }
}

export default todos;
