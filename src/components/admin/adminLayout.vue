<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1>Panel de Administración - Tecno DJesus</h1>
      <button @click="logout" class="logout-btn">Cerrar sesión</button>
    </header>
    <nav class="admin-nav">
      <router-link to="/admin/productos">Productos</router-link>
    </nav>
    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth'
import { useRouter } from 'vue-router'

const { logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #121121;
  color: white;
}
.admin-header {
  background-color: #1e1e2f;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ec8b00;
}
.admin-header h1 {
  margin: 0;
  font-size: 1.5rem;
}
.logout-btn {
  background-color: #ec8b00;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.logout-btn:hover {
  background-color: #d47a00;
}
.admin-nav {
  background-color: #0a0a14;
  padding: 0.5rem 2rem;
}
.admin-nav a {
  color: white;
  text-decoration: none;
  margin-right: 2rem;
  font-weight: 500;
}
.admin-nav a.router-link-exact-active {
  color: #ec8b00;
  border-bottom: 2px solid #ec8b00;
}
.admin-content {
  padding: 2rem;
}
</style>