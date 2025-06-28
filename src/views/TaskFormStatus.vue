<template>
  <transition name="fade">
    <div class="task-form">
      <h1 class="form-title">Change Task Status</h1>
      <h2>{{ task.title }}</h2>
      <form @submit.prevent="submit" class="form-body">
        <label class="form-label">
          Status
          <select v-model="task.status" class="form-select">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        <button type="submit" class="form-button">Save</button>
      </form>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      task: {
        status: 'pending',
      },
    };
  },
  mounted() {
    if (this.id !== 'new') {

      const auth = localStorage.getItem('auth');

      axios.get(`http://localhost:8081/api/task/${this.id}`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }).then((res) => {
        this.task = res.data;
      });
    }
  },
  methods: {
    submit() {
      const auth = localStorage.getItem('auth');
      const method = 'put';
      const url = `http://localhost:8081/api/task/${this.task.id}/status`

      axios[method](url, this.task, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      })
        .then(() => {
            this.$router.push('/tasks')
          })
        .catch(err => {
          const message = err?.response?.data?.message || 'Error updating task.';
          alert(message);
        });
    },
  },
};
</script>

<style scoped>
.task-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.form-title {
  font-weight: bold;
  margin-bottom: 1.2rem;
}

.form-label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
}

.form-input,
.form-textarea,
.form-select {
  display: block;
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  margin-top: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form-select {
  margin: 5px;
  padding-right: 10px;
}

.form-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;
}

.form-button:hover {
  background-color: #2563eb;
}

.fade-enter-active {
  transition: opacity 0.4s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
