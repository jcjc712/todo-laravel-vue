import Vue from 'vue'
import Vuex from 'vuex'
import todoService from '../services/TodoService'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        items: []
    },
    actions: {
        async listTodos (context) {
            const todosData = await todoService.getTodos()
            context.commit('listTodos', todosData.data.rows)
        },
        async addTodo (context, param) {
            const todosData = await todoService.addTodo(param)
            context.commit('addTodo', todosData.data.row)
        },
        async removeTodo (context, id) {
            const todosData = await todoService.removeTodo(id)
            context.commit('removeTodo', id)
        },
        async updateTodo (context, todo) {
            const todosData = await todoService.updateTodo(todo)
            context.commit('updateTodo', todosData.data.row)
        },
    },
    mutations: {
        listTodos(state, todos){
            state.items = todos
        },
        addTodo (state, todo) {
            state.items.unshift(todo)
        },
        removeTodo (state, id) {
            state.items = state.items.filter(item => item.id !== id)
        },
        updateTodo (state, todo) {
            let item = state.items.find((element) => { return element.id === todo.id })
            item.done = !item.done
        },
    }
});