<template>
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
</template>
<script>
    export default {
        data() {
          return {
              todoItemText: '',
          }
        },
        methods: {
            addTodo () {
                this.$store.dispatch('addTodo',this.todoItemText);
                this.todoItemText = ''
            }
        }
    }
</script>
<style>
</style>
