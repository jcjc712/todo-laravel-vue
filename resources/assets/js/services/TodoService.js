import axios from 'axios'

export default {
    getTodos () {
      const query = {}
      return axios.get('/api/todos', {params: query})
    },
    addTodo(param){
        const query = {
            text: param,
            done: 0,
        }
        return axios.post('/api/todos', query)
    },
    removeTodo(id){
        return axios.delete('/api/todos/'+id,{});
    },
    updateTodo(todo){
        return axios.put('/api/todos/'+todo.id,todo);
    }
}
