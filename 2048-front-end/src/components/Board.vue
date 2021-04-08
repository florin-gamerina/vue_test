<template>
  <div class="container" v-touch:swipe="swipeHandler">
    <div class="row" v-for="(row, rowIndex) in boardState" :key="rowIndex">
      <div
        class="tile"
        :style="getTileStyle(tile)"
        v-for="(tile, columnIndex) in boardState[rowIndex]"
        :key="columnIndex"
      >
        {{ getTileText(tile) }}
      </div>
    </div>
  </div>
</template>
<script>
import { Direction } from "@/constants/Direction";

export default {
  name: "Board",

  data() {
    return {
      tileColors: {
        0: "#CCC0B3",
        2: "#F8F3E9",
        4: "#ECE0C6",
        8: "#F1B179",
        16: "#F59563",
        32: "#F67C5F",
        64: "#F65E3B",
        128: "#EDCF72",
        256: "#EDCC61",
        512: "#EDC850",
        1024: "#EDC53F",
        2048: "#ECC22F",
      },
    };
  },

  created() {
    window.addEventListener("keyup", this.arrowHandler);
  },

  beforeDestroy: function() {
    window.removeEventListener("keyup", this.arrowHandler);
  },

  props: {
    boardState: {
      type: Array,
      required: true,
    },
  },

  methods: {
    swipeHandler(direction) {
      let enumDirection;
      switch (direction) {
        case "left":
          enumDirection = Direction.LEFT;
          break;
        case "right":
          enumDirection = Direction.RIGHT;
          break;
        case "bottom":
          enumDirection = Direction.DOWN;
          break;
        case "top":
          enumDirection = Direction.UP;
      }
      this.userActionHandler(enumDirection);
    },

    arrowHandler(ArrowEvent) {
      let enumDirection;

      switch (ArrowEvent.code) {
        case "ArrowLeft":
          enumDirection = Direction.LEFT;
          break;
        case "ArrowRight":
          enumDirection = Direction.RIGHT;
          break;
        case "ArrowDown":
          enumDirection = Direction.DOWN;
          break;
        case "ArrowUp":
          enumDirection = Direction.UP;
          break;
        default:
          return;
      }
      this.userActionHandler(enumDirection);
    },

    userActionHandler(direction) {
      console.log("direction", direction);
      this.$emit("userAction", direction);
    },

    getTileText(tile) {
      return tile == 0 ? "" : tile;
    },

    getTileColor(tile) {
      return this.tileColors[tile] || "#000000";
    },

    getTileFontColor(tile) {
      return tile <= 4 ? "#767067" : "white";
    },

    getTileStyle(tile) {
      return `background-color: ${this.getTileColor(
        tile
      )}; color: ${this.getTileFontColor(tile)}`;
    },
  },
};
</script>
<style scoped lang="less">
@import "~@/styles/variables.less";

@spacing: 5px;

.container {
  background-color: @cardColor;

  padding: @spacing;
  align-items: stretch;
}

.row {
  display: flex;
}

.tile {
  margin: @spacing;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media @smallScreen {
  .tile {
    height: ((@smallScreenWidth) / 4)- @spacing;
    width: ((@smallScreenWidth) / 4) - @spacing;
  }
}

@media @bigScreen {
  .tile {
    width: (@bigScreenWidth / 4);
    height: (@bigScreenWidth / 4);
  }
}

.container,
.tile {
  border-radius: 5px;
  font-size: 30px;
}
</style>
