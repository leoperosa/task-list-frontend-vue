<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>
        Username
        <input v-model="username" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: false,
    };
  },
  methods: {
    async login() {
      const encoded = btoa(`${this.username}:${this.password}`);
      await axios.post('http://localhost:8081/api/login', {user: this.username, password: this.password}).then(() => {
            localStorage.setItem('auth', encoded);
            this.$router.push('/tasks');
      })
      .catch(err => {
          const message = err?.response?.data?.message || 'Invalid credentials.';
          alert(message);
      });
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 40px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.login h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.login form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.login label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 0.95rem;
}

.login input {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.login input:focus {
  outline: none;
  border-color: #007bff;
}

.login button {
  padding: 0.6rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login button:hover {
  background-color: #0056b3;
}

.login p {
  margin: 0;
  font-size: 0.9rem;
}
</style>

