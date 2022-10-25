<template>
  <main>
    <div class="container-lg">
    <AddTask />

    
    
    <TaskList></TaskList>
    </div>
  </main>
</template>


<script>

import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'

export default {
  components: {
    AddTask,
    TaskList
  }
}


</script>
