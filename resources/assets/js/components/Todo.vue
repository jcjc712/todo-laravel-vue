<template>
    <div class="container">
        <div class="box">
            <form @submit.prevent="addTodo">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="Nuevo recordatorio" v-model="todoItemText">
                </p>
                <p class="control">
                    <button class="button is-info" :disabled="todoItemText == ''">
                        Agregar
                    </button>
                </p>
            </div>
            </form>
        </div>
        <table class="table is-bordered">
            <tr v-for="(todo, index) in items" :key="index">
                <td class="is-fullwidth" style="cursor: pointer" :class="{ 'is-done': todo.done }" @click="toggleDone(todo)">
                    {{ todo.text }}
                </td>
                <td class="is-narrow">
                    <a class="button is-danger is-small" @click="removeTodo(todo)">Eliminar</a>
                </td>
            </tr>
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
    export default {
        data () {
            return {
                todoItemText: '',
                items: [],
            }
        },
        mounted () {
            axios.get('/api/todos').then(
                response => this.items = response.data.rows
            )
        },
        methods: {
            addTodo () {
                axios.post('/api/todos',{
                    text: this.todoItemText,
                    done: 0,
                }).then(
                    response => {
                        this.items.unshift(response.data.row)
                        this.todoItemText = ''
                    }
                ).catch(
                    console.log('error')
                );
            },
            removeTodo (todo) {
                axios.delete('/api/todos/'+todo.id,{}).then(
                    response => {
                        this.items = this.items.filter(item => item !== todo)
                    }
                ).catch(
                    console.log('error')
                );
            },
            toggleDone (todo) {
                todo.done = !todo.done
                axios.put('/api/todos/'+todo.id,
                    todo
                ).then(
                    response => {
                        console.log('success');
                    }
                ).catch(
                    console.log('error')
                );
            }
        }
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
