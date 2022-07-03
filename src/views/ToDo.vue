<template>
  <div class="todo">
    <!-- <button class="myButton2" @click="newList()">Nueva lista</button> -->
    <div v-if="todoList" class="inputs">
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
      <ul class="fadeIn">
        <li
          v-for="(item, index) in items"
          :key="index"
          @mouseover="showCardBtn()"
          class="fadeIn"
        >
          <p :class="{ done: item.done }" @click="markAsDone(index)">
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
      todoList: [],
      items: [],
      doneItems: [],
      item: {
        text: null,
        date: null,
        doneDate: null,
        done: false,
      },
      todo: null,
      done: null,
      cardBtns: "card-btn",
      card: "card scale-up-center fade-in",
    };
  },

  methods: {
    newList() {},
    markAsDone(value) {
      if (!this.items[value].done) {
        this.items[value].done = true;
      } else {
        this.items[value].done = false;
      }
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
    reAddToList(value, item) {
      this.items.unshift(this.doneItems[value]);
      item.class = "";
      this.deleteFromDoneList(value);
    },
    deleteFromList(value, item) {
      this.hideCard();
      this.items.splice(value, 1);
      this.saveLocalStorage();
    },
    deleteFromDoneList(value, item) {
      this.hideCard();
      this.doneItems.splice(value, 1);
      this.saveLocalStorage();
    },
    addToDone(value, item) {
      this.hideCard();
      this.items[value].doneDate = new Date().toLocaleDateString();
      this.doneItems.push(this.items[value]);
      this.deleteFromList(value);
    },

    saveLocalStorage() {
      localStorage.setItem("toDoList", JSON.stringify(this.items));
      localStorage.setItem("doneList", JSON.stringify(this.doneItems));
    },
    loadLocalStorage() {
      if (localStorage.getItem("toDoList"))
        this.items = JSON.parse(localStorage.getItem("toDoList"));
      if (localStorage.getItem("doneList"))
        this.doneItems = JSON.parse(localStorage.getItem("doneList"));
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
  },
  mounted() {
    this.loadLocalStorage();
  },
};
</script>
<style scoped>
.todo {
  background: url("@/assets/bg.svg");
  border-radius: 10px;
  max-width: 700px;
}
h1 {
  color: white;
}
ul {
  background: white;
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