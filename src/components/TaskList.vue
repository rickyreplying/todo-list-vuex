<template>

  <div v-if="loading" class="text-center">
    Loading data . . .
  </div>

  <div class="container w-75 mx-auto">
    <div class="row">
      <div class="col-lg-4 col-md-6 my-2" v-for="todo in todos" :key="todo.id">
        <div class="card"
          :class="{'bg-warning': todo.status === 'On Progress', 'bg-success text-white': todo.status === 'Completed'}"
          style="max-width: 18rem;">
          <div class="card-header">
            
            Status : {{ todo.status }}
            <router-link :to="/detail/ + todo.id">
              Go to Detail
            </router-link>

          </div>
          <div class="card-body">
            <h5 class="card-title"> {{ todo.title }}</h5>
            <!-- <p class="card-text"> {{ todo.description }}</p> -->

            <button type="button" class="btn btn-secondary btn-sm m-1" data-bs-toggle="modal"
              data-bs-target="#formModal" @click="editTask(todo)">
              Edit Task
            </button>
            <button type="buttom" class="btn btn-danger btn-sm m-1" @click="deleteTask(todo)">Delete task</button>


          </div>
        </div>

      </div>
    </div>

    <form>
      <div class="modal fade in" id="formModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Task</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text w-40" id="basic-addon3">Task Title</span>
                <input type="text" class="form-control" v-model="todoSelected.title" required>
              </div>
              <div class="input-group">
                <span class="input-group-text">Task Description</span>
                <textarea class="form-control" v-model="todoSelected.description"></textarea>
              </div>

              <h5 class="mt-2">Status: </h5>

              <div class="form-check">
                <input class="form-check-input" type="radio" name="on-progress" id="on-progress" value="On Progress"
                  v-model="todoSelected.status">
                <label class="form-check-label" for="on-progress">
                  On Progress
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="on-progress" id="on-progress" value="Completed"
                  v-model="todoSelected.status">
                <label class="form-check-label" for="completed">
                  Completed
                </label>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" ref="Close" class="btn btn-primary" id="submitupdate" @click="updateTask()"
                data-bs-dismiss="modal" :disabled="!todoSelected.title || !todoSelected.description">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>




</template>


<script>
  export default {
    mounted() {
      this.$store.dispatch("loadTask");
    },

    computed: {
      todos() {
        return this.$store.state.todos;
      },
      loading() {
        return this.$store.state.loading;
      },
      todoSelected() {
        return this.$store.state.todoSelected
      }
    },

    methods: {
      editTask(todo) {
        this.$store.commit('editData', todo);
      },

      deleteTask(todo) {
        this.$store.dispatch('deleteTask', todo.id);
      },

      updateTask() {
         this.$store.dispatch('updateTask', this.todoSelected);
      }
    }


  }
</script>

<style scoped>
 a {
    color: #000000;
    text-decoration: none;
}
 h5 {
  text-transform: capitalize;
 }
</style>