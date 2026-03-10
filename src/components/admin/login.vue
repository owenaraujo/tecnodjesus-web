<template>
  <div class="login-container">
    <div class="login-box">
      <h2><span class="naranja">Admin</span> Tecno DJesus</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const { login } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
    router.push('/admin/productos')
  } catch (err) {
    error.value = 'Credenciales inválidas'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121121;
}
.login-box {
  background-color: #1e1e2f;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}
h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}
.naranja {
  color: #ec8b00;
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
}
input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #121121;
  color: white;
}
input:focus {
  outline: none;
  border-color: #ec8b00;
}
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #ec8b00;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
button:hover:not(:disabled) {
  background-color: #d47a00;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.error {
  color: #ff6b6b;
  text-align: center;
  margin-top: 1rem;
}
</style>