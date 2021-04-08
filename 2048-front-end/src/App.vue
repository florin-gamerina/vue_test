<template>
  <div id="app">
    <div class="game-width">
      <div class="row center">
        <h1>2048</h1>
        <div class="column">
          <p>Score</p>
          <p>{{ score }}</p>
        </div>

        <div class="column">
          <p>High Score</p>
          <p>{{ highScore }}</p>
        </div>
      </div>
      <div class="row right">
        <button @click="restart">
          <i class="fas fa-sync"></i>
        </button>
      </div>
      <div class="row center">
        <board :boardState="board" @userAction="handleUserAction" />
      </div>
    </div>
  </div>
</template>

<script>
import Board from "@/components/Board";
import { StateService } from "@/services/StateService";
export default {
  name: "App",
  components: {
    Board,
  },
  created() {
    this.board = StateService.getInitialBoardState();
  },

  methods: {
    restart() {
      this.board = StateService.getInitialBoardState();
    },
    handleUserAction(direction) {
      const response = StateService.handleAction(this.board, direction);
      this.board = response.currentState;
      if (StateService.checkWin(response.currentState)) {
        setTimeout(() => {
          alert("You won");
          this.restart();
        }, 0);
      }
    },
  },

  data() {
    return {
      board: [],
      score: 0,
      highScore: 0,
    };
  },
};
</script>

<style lang="less">
@import "~@/styles/variables.less";

#app {
  display: flex;
  justify-content: center;
}
h1 {
  flex-grow: 1;
  text-align: start;
}

div .column {
  color: white;
  background-color: @cardColor;

  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}
.row {
  display: flex;
}

.center {
  justify-content: center;
}
.right {
  justify-content: flex-end;
}
html {
  background-color: #fbf8f0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  margin-top: 60px;
}

button {
  background-color: @cardColor;
  border-width: 0;
  border-radius: 5px;
  font-size: 20px;
  padding: 5px;
  margin: 5px;
  color: white;
}
</style>
