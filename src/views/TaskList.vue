<template>
  <div class="task-list">
    <h1>Task List</h1>

    <div class="toolbar">
      <router-link to="/task/new" class="new-task-btn">+ New Task</router-link>
      <div class="filters">
        <input v-model="filters.title" placeholder="Filter by title" />
        <select v-model="filters.status">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button @click="fetchTasks">Apply Filters</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading tasks...</div>
    <transition-group name="fade" tag="div">
      <div class="task" v-for="task in tasks" :key="task.id">
        <div class="task-header">
          <h2>{{ task.title }}</h2>
          <router-link :to="`/task/${task.id}/status/`"><span class="status" :class="task.status">{{ task.status.replace('_', ' ') }}</span></router-link>
        </div>
        <p class="description">{{ task.description }}</p>
        <div class="buttons">
          <router-link :to="`/task/${task.id}`">Edit</router-link>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </div>
    </transition-group>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">&laquo; Prev</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage">Next &raquo;</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      page: 1,
      limit: 5,
      loading: false,
      filters: {
        title: '',
        status: ''
      }
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      this.loading = true;
      const params = {
        page: this.page,
        limit: this.limit,
        title: this.filters.title,
        status: this.filters.status
      };
      const auth = localStorage.getItem('auth');

      axios.get('http://localhost:8081/api/task', {
          params,
          headers: {
            Authorization: `Basic ${auth}`
          }
        })
        .then(res => {
          this.tasks = res.data.tasks;
        })
        .catch(err => {
          console.error('Failed to fetch tasks:', err);
          alert('Error loading tasks.');
        })
        .finally(() => this.loading = false);
    },
    deleteTask(id) {
      if (!confirm('Are you sure you want to delete this task?')) return;

      const auth = localStorage.getItem('auth');

      axios.delete(`http://localhost:8081/api/task/${id}`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      })
        .then(() => {
          this.fetchTasks();
        })
        .catch(err => {
          console.error('Failed to delete task:', err);
          const message = err?.response?.data?.message || 'Error deleting task.';
          alert(message);
        });
    },
    nextPage() {
      this.page++;
      this.fetchTasks();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchTasks();
      }
    }
  }
};
</script>

<style scoped>
.task-list {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.new-task-btn {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
}

.filters input,
.filters select,
.filters button {
  margin-left: 0.5rem;
  padding: 0.3rem 0.5rem;
}

.loading {
  text-align: center;
  font-style: italic;
  color: gray;
}

.task {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-header h2 {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.status {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  text-transform: capitalize;
  cursor: pointer;
}

.status.pending {
  background-color:rgb(245, 32, 32);
  color: white;
}

.status.in_progress {
  background-color: #ffeb3b;
  color: #000;
}

.status.closed {
  background-color: #4caf50;
  color: white;
}

.description {
  margin: 0.5rem 0;
  text-align: left;
}

.buttons {
  text-align: left;
}

.buttons button,
.buttons a {
  margin-right: 0.5rem;
  background-color: #eee;
  border: none;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  color: #333;
}

.pagination {
  text-align: center;
  margin-top: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
