<template>
  <button class="myButton2" @click="addToLists(0)">Nueva lista</button>

  <div class="todo scaleUpCenter" id="drag">
    <!-- <button class="myButton2" @click="newList()">Nueva lista</button> -->
    <div class="inputs">
      <input
        id="text"
        type="text"
        v-model="item.text"
        placeholder="tarea"
        @keypress.enter="addToList()"
      />

      <!-- <button class="myButton2" @click="addToList()">Agregar tarea</button> -->
    </div>
    <div class="container">
      <!-- <div>
        <input type="color" name="" id="" v-model="theme.noteColor" />
        <input type="color" name="" id="" v-model="theme.fontColor" />
      </div> -->

      <ul class="fadeIn" id="ul">
        <li
          id="li"
          v-for="(item, index) in items"
          :key="index"
          @mouseover="showCardBtn()"
          @mouseout="hideCardBtn()"
          class="fadeIn"
          draggable="true"
        >
          <p :class="{ done: item.done }" id="p" @click="markAsDone(index)">
            {{ item.text }}
          </p>
          <img
            :class="cardBtns"
            src="@/assets/cross.png"
            @click="deleteFromList(index)"
            alt=""
            srcset=""
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [],
      items: [],
      item: {
        text: null,
        done: false,
      },
      cardBtns: "card-btn",
      card: "card scale-up-center fade-in",
      theme: {
        fontSize: "15pt",
        fontColor: "#2c3e50",
        noteColor: "#FFFFFF",
      },
    };
  },
  watch: {
    theme(newValue) {
      if (newValue) {
        // this.changeTheme();
      }
    },
  },
  methods: {
    markAsDone(value) {
      if (!this.items[value].done) {
        this.items[value].done = true;
      } else {
        this.items[value].done = false;
      }
      this.saveLocalStorage();
    },
    addToList() {
      if (this.item.text) {
        this.items.unshift({
          text: this.item.text,
          date: this.item.date,
        });
        this.item.text = "";
        this.item.date = undefined;
        this.saveLocalStorage();
      }
    },
    addToLists() {
      console.log(this.items);
      this.lists.push(this.items);
      console.log(this.lists);
    },
    deleteFromList(value) {
      this.hideCard();
      this.items.splice(value, 1);
      this.saveLocalStorage();
    },

    saveLocalStorage() {
      localStorage.setItem("toDoList", JSON.stringify(this.items));
      localStorage.setItem("doneList", JSON.stringify(this.doneItems));
      localStorage.setItem("theme", JSON.stringify(this.theme));
    },
    loadLocalStorage() {
      if (localStorage.getItem("toDoList"))
        this.items = JSON.parse(localStorage.getItem("toDoList"));
      if (localStorage.getItem("doneList"))
        this.doneItems = JSON.parse(localStorage.getItem("doneList"));
      if (localStorage.getItem("theme"))
        this.theme = JSON.parse(localStorage.getItem("theme"));
    },
    showCardBtn() {
      this.cardBtns = "card-btn-visible fade-in";
    },
    hideCardBtn() {
      this.cardBtns = "card-btn fade-out";
    },
    hideCard() {
      this.card = "card blur-out fade-out";
    },
    onDrag({ movementX, movementY }) {
      const draggableDiv = document.getElementById("drag");
      let getStyle = window.getComputedStyle(draggableDiv);
      let left = parseInt(getStyle.left);
      let top = parseInt(getStyle.top);

      draggableDiv.style.left = `${left + movementX}px`;
      draggableDiv.style.top = `${top + movementY}px`;
    },
    changeTheme() {
      document.querySelector("p").style.color = this.theme.fontColor;
      document.querySelector("p").style.fontSize = this.theme.fontSize;
      document.querySelector("ul").style.background = this.theme.noteColor;
    },
  },
  mounted() {
    this.loadLocalStorage();

    let draggableDiv = document.getElementById("drag");
    draggableDiv.addEventListener("mousedown", () => {
      draggableDiv.addEventListener("mousemove", this.onDrag);
    });
    document.addEventListener("mouseup", () => {
      draggableDiv.removeEventListener("mousemove", this.onDrag);
    });
  },
};
</script>
<style scoped>
.todo {
  cursor: pointer;
  background: url("@/assets/bg.svg");
  border-radius: 10px;
  top: 50%;
  left: 50%;
  width: 500px;
  position: absolute;
  transform: translate(-50%, -50%);
}

h1 {
  color: white;
}
ul {
  background: #ffffff;
  max-width: 900px;
  border-radius: 15px;
}
li {
  text-align: left;
  padding-bottom: 10px;
}
li p {
  display: inline;
  cursor: pointer;
  text-align: left;
  font-size: 15pt;
}

.container {
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1em; */
  display: flex;
  justify-content: center;
  transition: 0.3s;
}
.card {
  transition: 0.3s;
  border-radius: 20px;
  padding: 30px;
  margin: 30px;
  width: 200px;
  background: white;
  -webkit-box-shadow: 5px 5px 20px -2px #000000;
  box-shadow: 5px 5px 20px -2px #000000;
}
.card:hover {
  transition: 0.3s;
  transform: scale(1.1);
}
.btn-div {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.card-btn {
  visibility: hidden;
  cursor: pointer;
  margin: 5px;
  width: 15px;
  transition: 0.3s;
  position: relative;
  top: 6px;
}
.card-btn-visible {
  visibility: visible;
  cursor: pointer;
  margin: 5px;
  width: 15px;
  transition: 0.3s;
  position: relative;
  top: 6px;
}
.card-btn-visible:hover {
  transition: 0.3s;
  transform: scale(1.2);
}

.done {
  text-decoration: line-through;
}
</style>