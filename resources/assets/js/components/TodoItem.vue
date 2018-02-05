<template>
    <tr>
        <td class="is-fullwidth" style="cursor: pointer" :class="{ 'is-done': done }" @click="toggleDone()">
            {{ text }}
        </td>
        <td class="is-narrow">
            <a class="button is-danger is-small" @click="removeTodo()">Eliminar</a>
        </td>
    </tr>
</template>
<script>
    export default {
        props: {
            text: String,
            done: Boolean,
            id: Number
        },
        methods: {
            toggleDone(){
                this.$store.dispatch('updateTodo',{id: this.id, done:!this.done, text:this.text});
            },
            removeTodo(){
                this.$store.dispatch('removeTodo',this.id);
            }
        }
    }
</script>
<style>
</style>