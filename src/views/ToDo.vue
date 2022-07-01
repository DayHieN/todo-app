<template>
  <h1>Cosas que hacer</h1>
  <div class="btn-div">
    <button @click="toDo()">Por hacer</button>
    <button @click="doneItem()">Hecho</button>
  </div>
  <div class="todo" v-if="todo">
    <div class="inputs">
      <input
        id="title"
        type="text"
        v-model="item.title"
        placeholder="título"
        @keypress.enter="addToList()"
        onfocus="this.value = ''"
      />
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
    </div>

    <div class="container">
      <div
        class="card scale-up-center fade-in"
        v-for="(item, index) in items"
        :key="index"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
        <p>{{ item.date }}</p>
        <img
          class="card-btn"
          @click="addToDone(index)"
          src="@/assets/tick.png"
          alt=""
          srcset=""
        />
        <img
          class="card-btn"
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
        class="card scale-up-center fade-in"
        v-for="(item, index) in doneItems"
        :key="index"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
        <p>{{ item.doneDate }}</p>
        <img
          class="card-btn"
          @click="reAddToList(index)"
          src="@/assets/redo.png"
          alt=""
          srcset=""
        />
        <img
          class="card-btn"
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
        title: null,
        text: null,
        date: null,
        doneDate: null,
      },
      todo: null,
      done: null,
    };
  },
  methods: {
    addToList() {
      if (this.item.text) {
        this.items.unshift({
          title: this.item.title,
          text: this.item.text,
          date: this.item.date,
        });
        this.saveLocalStorage();
      }
      this.clearInput();
    },
    reAddToList(value) {
      this.items.unshift(this.doneItems[value]);
      this.deleteFromDoneList(value);
    },
    deleteFromList(value) {
      this.items.splice(value, 1);
      this.saveLocalStorage();
    },
    deleteFromDoneList(value) {
      this.doneItems.splice(value, 1);
      this.saveLocalStorage();
    },
    addToDone(value) {
      this.doneItems.push(this.items[value]);
      this.deleteFromList(value);
    },
    clearInput() {
      document.getElementById("title").value = "";
      document.getElementById("text").value = "";
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
      console.log(this.items);
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
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1em;
  transition: 0.3s;
}
.card {
  cursor: pointer;
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
button {
  cursor: pointer;
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  margin: 20px;
}

button:hover {
  border: 1px solid white;
}

button:active {
  box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
}
button:focus {
  box-shadow: 4px 4px 12px #797979, -4px -4px 12px #b9b9b9;
}
.card-btn {
  margin: 40px;
  width: 20px;
  transition: 0.3s;
}
.card-btn:hover {
  transition: 0.3s;
  transform: scale(1.2);
}
</style>