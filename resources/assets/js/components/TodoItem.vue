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
                this.$emit('toggleDone', this.$props)
            },
            removeTodo(){
                this.$emit('removeTodo', this.id)
            }
        }
    }
</script>
<style>
</style>