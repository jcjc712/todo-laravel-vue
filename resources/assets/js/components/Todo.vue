<template>
    <div class="container">
        <div class="box">
            <todo-input></todo-input>
        </div>
        <table class="table is-bordered">
            <todo-item
                    v-for="(todo, index) in items"
                    :key="index"
                    :id="todo.id"
                    :text="todo.text"
                    :done="todo.done"
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
    import {mapState, mapMutations, mapGetters} from 'vuex'
    export default {
        components: {
            TodoInput,
            TodoItem,
        },
        mounted () {
            this.$store.dispatch('listTodos');
        },
        computed: {
            ...mapState(['items']),
        },
    }
</script>
<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
