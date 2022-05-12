<template>
  <div id="wrapper">
    <h1>Todo List</h1>
    <input v-model="todo" id="todo-input" type="text" placeholder="Add a todo..." />
    <button id="add-button" :disabled="!todo.length" @click="submitTask">Add</button>
    <ul id="todo-list">
      <li v-for="(todo) in tasks" :key="todo.id">
        <h2>{{todo.text}}</h2>
        <button class="delete-button" @click="deleteTask(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
export default {
  name: 'TodoList',
  props: {
  },
  data(){
    return {
      todo: '',
      tasks: [],
    }
  },
  created(){
    this.tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
  }
  ,
  methods: {
    submitTask(){
      if(this.todo.length === 0) return;

      this.tasks.push({
        text : this.todo,
        id : uuidv4()
      });

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.todo = '';
    },
    deleteTask(id){
      const taskToDelete = this.tasks.findIndex(el => el.id == id);
      this.tasks.splice(taskToDelete, 1);
      
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 70vw;
  background-color: grey;
  color: white;
  padding: 12px;
  border-radius: 12px;
  margin: auto;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 24px auto;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border: 2px solid black;
  background-color: #00557f;
  border-radius: 5px;
  margin: 5px;
}

h1 {
  font-size: 36px;
}

h2 {
  margin-right: 24px;
}

input {
  font-size: 24px;
  padding: 8px 8px;
  outline: none;
  width: 50%;
}

#add-button {
  font-size: 24px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: lightblue;
  transition: 0.5s;
  cursor: pointer;
}

#add-button:disabled {
  background-color: revert;
  cursor: default;
}

.wrapper {
  width: 70vw;
  margin: auto;
  text-align: center;
  background: grey;
  color: white;
}

.delete-button {
  background: none;
  color: white;
  border: 1px solid transparent;
  border-radius: 100%;
  height: 24px;
  width: 24px;
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  transition: 0.5s;
  cursor: pointer;
}

.delete-button:hover {
  border-color: white;
  transform: scale(1.2);
}

</style>
