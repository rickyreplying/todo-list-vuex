<template>
  <div class="container-lg mt-5">
    <div class="bg-light p-5 rounded">
      <h3>Task Name : {{ todoSelected.title }} </h3>
      <h5>Status : {{ todoSelected.status}} </h5>
      <p class="lead">Description : {{ todoSelected.description }}</p>

      <router-link to="/">
        <a class="btn btn btn-secondary" role="button">Back to Home</a>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {

    mounted() {
      this.$store.dispatch("loadTaskDetail", this.$route.params.id);
    },

    computed: {
      todoSelected() {
        return this.$store.state.todoDetail;
      }
    }



  }
</script>