<template>
    <h1 class="text-center w-75 mx-auto mt-3">To-Do List App</h1>
    <form @submit.prevent="addTask">
        <input type="hidden" v-model="form.id">
        <div class="my-5 w-75 mx-auto bg-light p-5 rounded">
            <div class="input-group mb-3">
                <span class="input-group-text w-40" id="basic-addon3">Task Title</span>
                <input type="text" class="form-control" v-model="form.title" required>
            </div>
            <div class="input-group">
                <span class="input-group-text">Task Description</span>
                <textarea class="form-control" v-model="form.description" required></textarea>
            </div>
            <button class="btn btn-outline-secondary mt-2 w-100" type="submit">Add
                task</button>
        </div>
    </form>

    <div v-if="addLoading" class="text-center">
    Adding data . . .
  </div>
</template>


<script>
    export default {
        data() {
            return {
                form: {
                    title: '',
                    status: 'On Progress',
                    description: '',
                }
            }
        },

        computed: {
            addLoading() {
                return this.$store.state.addLoading;
      },
        },

        methods: {
            addTask() {
                this.$store.dispatch("addTask", this.form);
                this.form.title = '';
                this.form.description = '';
                // this.$store.dispatch("loadTask");
            }
        }

    }
</script>