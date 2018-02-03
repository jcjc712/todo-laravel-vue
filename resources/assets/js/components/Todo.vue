<template>
    <div class="container">
        <div class="box">
            <todo-input @addTodo="addTodo"></todo-input>
        </div>
        <table class="table is-bordered">
            <todo-item
                    v-for="(todo, index) in items"
                    :key="index"
                    :id="todo.id"
                    :text="todo.text"
                    :done="todo.done"
                    @toggleDone="toggleDone"
                    @removeTodo="removeTodo"
            ></todo-item>
        </table>
    </div>
</template>

<script>
    /**
     * Tips:
     * - En mounted pueden obtener el listado del backend de todos y dentro de la promesa de axios asirnarlo
     *   al arreglo que debe tener una estructura similar a los datos de ejemplo.
     * - En addTodo, removeTodo y toggleTodo deben hacer los cambios pertinentes para que las modificaciones,
     *   addiciones o elimicaiones tomen efecto en el backend asi como la base de datos.
     */
    import TodoInput from './TodoInput.vue'
    import TodoItem from './TodoItem.vue'
    export default {
        components: {
            TodoInput,
            TodoItem
        },
        data () {
            return {
                items: [],
            }
        },
        mounted () {
            axios.get('/api/todos').then(
                response => this.items = response.data.rows
            )
        },
        methods: {
            addTodo (param) {
                axios.post('/api/todos',{
                    text: param,
                    done: 0,
                }).then(
                    response => {
                        this.items.unshift(response.data.row)
                    }
                ).catch(function (error) {
                        console.log(error);
                });
            },
            removeTodo (id) {
                axios.delete('/api/todos/'+id,{}).then(
                    response => {
                        this.items = this.items.filter(item => item.id !== id)
                    }
                ).catch(function (error) {
                    console.log(error);
                });
            },
            toggleDone: function(todo) {
                let item = this.items.find((element) => { return element.id === todo.id })
                item.done = !item.done
                axios.put('/api/todos/'+item.id,
                    item
                ).then(
                    response => {
                        console.log('success');
                    }
                ).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
