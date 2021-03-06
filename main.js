const todoStorage = {
  getStorage: () => {
    return JSON.parse(localStorage.getItem('todos')) || []
  },
  setStorage: (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
}

new Vue({
  el: '#app',
  data () {
    return {
      newItem: '',
      editingItemIndex: undefined,
      todos: []
    }
  },
  mounted () {
    this.todos = todoStorage.getStorage()
  },
  methods: {
    addItem: function () {
      if (this.newItem === '') return
      const uuid = new Date().getTime().toString(16) + Math.floor(Math.random()).toString(16)
      const todo = {
        id: uuid,
        item: this.newItem,
        isDone: false
      }
      this.todos.push(todo)
      todoStorage.setStorage(this.todos)
      this.newItem = ''
    },
    updateItem: function () {
      if (this.newItem === '') return
      this.todos[this.editingItemIndex].item = this.newItem
      todoStorage.setStorage(this.todos)
      this.newItem = ''
      this.editingItemIndex = undefined
    },
    editItem: function (index) {
      this.newItem = this.todos[index].item
      this.editingItemIndex = index
    },
    deleteItem: function (index) {
      this.todos.splice(index, 1)
      todoStorage.setStorage(this.todos)
    },
    checkedItem: function () {
      todoStorage.setStorage(this.todos)
    }
  }
})
