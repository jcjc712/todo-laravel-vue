import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        items: []
    },
    mutations: {
        listTodos(state){
            axios.get('/api/todos').then(
                response => state.items = response.data.rows
            )
        },
        addTodo (state, param) {
            axios.post('/api/todos',{
                text: param,
                done: 0,
            }).then(
                response => {
                state.items.unshift(response.data.row)
            }).catch(function (error) {
                console.log(error);
            });
        },
        removeTodo (state, id) {
            axios.delete('/api/todos/'+id,{}).then(response => {
                state.items = state.items.filter(item => item.id !== id)
            console.log(items);
            }).catch(function (error) {
                console.log(error);
            });
        },
        toggleDone: function(state, id) {
            let item = state.items.find((element) => { return element.id === id })
            item.done = !item.done
            axios.put('/api/todos/'+item.id,
                item
            ).then(
                response => {
                console.log('success');
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});