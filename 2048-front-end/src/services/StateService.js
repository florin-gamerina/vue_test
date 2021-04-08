import { Direction } from "@/constants/Direction";

export const StateService = {
  boardSize: 4,
  winValue: 2048,

  generateZerosMatrix() {
    let initialBoard = new Array(this.boardSize);

    for (let i = 0; i < this.boardSize; i++) {
      initialBoard[i] = new Array(this.boardSize);
      initialBoard[i].fill(0);
    }
    return initialBoard;
  },

  getInitialBoardState() {
    const initialBoard = this.generateZerosMatrix();
    this.setRandomValue(initialBoard, 2);
    this.setRandomValue(
      initialBoard,
      this._generateRandomBetweenTwoValues(2, 4)
    );
    return initialBoard;
  },

  _generateRandomIndex() {
    const randomIndex = Math.floor(
      Math.random() * this.boardSize * this.boardSize
    );
    return randomIndex;
  },

  _generateRandomBetweenTwoValues(first, second) {
    return Math.random() <= 0.5 ? first : second;
  },

  checkWin(boardState) {
    return boardState.flat().some((element) => element == this.winValue);
  },

  setRandomValue(matrix, value) {
    if (!matrix.flat().some((element) => element == 0)) {
      return;
    }
    let index = this._generateRandomIndex();
    let rows = Math.floor(index / matrix.length);
    let column = index % matrix.length;
    while (matrix[rows][column] != 0) {
      index = this._generateRandomIndex();
      rows = Math.floor(index / matrix.length);
      column = index % matrix.length;
    }
    matrix[rows][column] = value;
  },

  moveRight(boardState) {
    const newState = [];
    for (let index = 0; index < boardState.length; index++) {
      const filteredRow = boardState[index].filter((num) => num);
      const numberOfZeros = boardState.length - filteredRow.length;
      const zeros = Array(numberOfZeros).fill(0);
      newState.push(zeros.concat(filteredRow));
    }
    return newState;
  },

  combineRow(boardState) {
    for (const row of boardState) {
      for (let index = 0; index < row.length - 1; index++) {
        if (row[index] == row[index + 1]) {
          row[index] += row[index + 1];
          row[index + 1] = 0;
        }
      }
    }
  },

  combineColumn(boardState) {
    for (let row = 0; row < boardState.length - 1; row++) {
      for (let column = 0; column < boardState.length; column++) {
        if (boardState[row][column] == boardState[row + 1][column]) {
          boardState[row][column] += boardState[row + 1][column];
          boardState[row + 1][column] = 0;
        }
      }
    }
  },
  handleRight(boardState) {
    const newState = this.moveRight(boardState);
    this.combineRow(newState);
    const finalState = this.moveRight(newState);
    this.setRandomValue(finalState, this._generateRandomBetweenTwoValues(2, 4));
    return finalState;
  },

  handleLeft(boardState) {
    const newState = this.moveLeft(boardState);
    this.combineRow(newState);
    const finalState = this.moveLeft(newState);
    this.setRandomValue(finalState, this._generateRandomBetweenTwoValues(2, 4));
    return finalState;
  },

  handleDown(boardState) {
    const newState = this.moveDown(boardState);
    this.combineColumn(newState);
    const finalState = this.moveDown(newState);
    this.setRandomValue(finalState, this._generateRandomBetweenTwoValues(2, 4));
    return finalState;
  },

  handleUp(boardState) {
    const newState = this.moveUp(boardState);
    this.combineColumn(newState);
    const finalState = this.moveUp(newState);
    this.setRandomValue(finalState, this._generateRandomBetweenTwoValues(2, 4));
    return finalState;
  },

  moveLeft(boardState) {
    const newState = [];
    for (let index = 0; index < boardState.length; index++) {
      const filteredRow = boardState[index].filter((num) => num);
      const numberOfZeros = boardState.length - filteredRow.length;
      const zeros = Array(numberOfZeros).fill(0);
      newState.push(filteredRow.concat(zeros));
    }
    return newState;
  },

  moveDown(boardState) {
    const newState = this.generateZerosMatrix();
    for (let i = 0; i < boardState.length; i++) {
      const column = boardState.map((row) => row[i]);
      const filteredColumn = column.filter((num) => num);
      const noOfZeros = boardState.length - filteredColumn.length;
      const zeros = Array(noOfZeros).fill(0);
      const newColumn = zeros.concat(filteredColumn);
      for (let j = 0; j < boardState.length; j++) {
        newState[j][i] = newColumn[j];
      }
    }
    return newState;
  },

  moveUp(boardState) {
    const newState = this.generateZerosMatrix();
    for (let i = 0; i < boardState.length; i++) {
      const column = boardState.map((row) => row[i]);
      const filteredColumn = column.filter((num) => num);
      const noOfZeros = boardState.length - filteredColumn.length;
      const zeros = Array(noOfZeros).fill(0);
      const newColumn = filteredColumn.concat(zeros);
      for (let j = 0; j < boardState.length; j++) {
        newState[j][i] = newColumn[j];
      }
    }
    return newState;
  },

  handleAction(boardState, userAction) {
    let currentState = null;
    switch (userAction) {
      case Direction.RIGHT:
        currentState = this.handleRight(boardState);
        break;
      case Direction.LEFT:
        currentState = this.handleLeft(boardState);
        break;
      case Direction.DOWN:
        currentState = this.handleDown(boardState);
        break;
      case Direction.UP:
        currentState = this.handleUp(boardState);
        break;
    }
    return { previousState: boardState, userAction, currentState };
  },
};
