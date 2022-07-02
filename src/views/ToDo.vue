<template>
  <h1>Cosas que hacer</h1>
  <div class="btn-div">
    <button class="myButton2" @click="toDo()">Por hacer</button>
    <button class="myButton2" @click="doneItem()">Hecho</button>
  </div>
  <div class="todo" v-if="todo">
    <div class="inputs">
      <input
        id="text"
        type="text"
        v-model="item.text"
        placeholder="tarea"
        @keypress.enter="addToList()"
        onfocus="this.value = ''"
      />
      <input
        type="date"
        v-model="item.date"
        @keypress.enter="addToList()"
        name="date"
        id=""
      />
      <button class="myButton2" @click="addToList()">Agregar tarea</button>
    </div>

    <div class="container">
      <div
        :class="card"
        v-for="(item, index) in items"
        :key="index"
        @mouseover="showCardBtn()"
        @mouseout="hideCardBtn()"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
        <p v-if="item.date">Fecha límite: {{ item.date }}</p>
        <img
          :class="cardBtns"
          @click="addToDone(index)"
          src="@/assets/tick.png"
          alt=""
          srcset=""
        />

        <img
          :class="cardBtns"
          @click="deleteFromList(index)"
          src="@/assets/cross.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
  <div class="done" v-if="done">
    <div class="container">
      <div
        :class="card"
        v-for="(item, index) in doneItems"
        :key="index"
        @mouseover="showCardBtn()"
        @mouseout="hideCardBtn()"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
        <p v-if="item.doneDate">Fecha de realización: {{ item.doneDate }}</p>
        <img
          :class="cardBtns"
          @click="reAddToList(index)"
          src="@/assets/redo.png"
          alt=""
          srcset=""
        />
        <img
          :class="cardBtns"
          @click="deleteFromDoneList(index)"
          src="@/assets/cross.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      doneItems: [],
      item: {
        text: null,
        date: null,
        doneDate: null,
      },
      todo: null,
      done: null,
      cardBtns: "card-btn",
      card: "card scale-up-center fade-in",
    };
  },

  methods: {
    addToList() {
      if (this.item.text) {
        this.items.unshift({
          text: this.item.text,
          date: this.item.date,
        });
        this.saveLocalStorage();
      }
    },
    reAddToList(value) {
      this.items.unshift(this.doneItems[value]);
      this.deleteFromDoneList(value);
    },
    deleteFromList(value) {
      this.hideCard();
      this.items.splice(value, 1);
      this.saveLocalStorage();
    },
    deleteFromDoneList(value) {
      this.hideCard();
      this.doneItems.splice(value, 1);
      this.saveLocalStorage();
    },
    addToDone(value) {
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
    toDo() {
      this.todo = true;
      this.done = false;
    },
    doneItem() {
      this.todo = false;
      this.done = true;
    },
  },
  mounted() {
    this.loadLocalStorage();
  },
};
</script>
<style scoped>
h1 {
  color: white;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1em;
  /* display: flex;
  justify-content: center; */
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
  width: 25px;
  transition: 0.3s;
}
.card-btn-visible {
  visibility: visible;
  cursor: pointer;
  margin: 5px;
  width: 25px;
  transition: 0.3s;
}
.card-btn-visible:hover {
  transition: 0.3s;
  transform: scale(1.2);
}
</style>