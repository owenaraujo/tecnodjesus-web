<template>
  <div>
    <div class="header-actions">
      <h2>Productos</h2>
      <router-link to="/admin/productos/nuevo" class="btn-primary">+ Nuevo Producto</router-link>
    </div>

    <div v-if="loading" class="text-center py-8">Cargando...</div>
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="image-preview">
          <img
            v-if="product.product_images && product.product_images.length"
            :src="product.product_images[0].image_url"
            :alt="product.name"
          >
          <div v-else class="no-image">Sin imagen</div>
        </div>
        <h3>{{ product.name }}</h3>
        <p class="price" v-if="product.price">${{ product.price.toLocaleString() }}</p>
        <p class="category">{{ product.category }}</p>
        <div class="actions">
          <router-link :to="`/admin/productos/editar/${product.id}`" class="btn-edit">Editar</router-link>
          <button @click="confirmDelete(product.id)" class="btn-delete">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProducts } from '../../composables/useProducts'

const { products, loading, fetchProducts, deleteProduct } = useProducts()

onMounted(() => {
  fetchProducts()
})

const confirmDelete = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto? Se eliminarán también sus imágenes.')) {
    await deleteProduct(id)
    await fetchProducts()
  }
}
</script>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
h2 {
  margin: 0;
  color: white;
}
.btn-primary {
  background-color: #ec8b00;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}
.btn-primary:hover {
  background-color: #d47a00;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.product-card {
  background-color: #1e1e2f;
  border-radius: 8px;
  padding: 1rem;
}
.image-preview {
  width: 100%;
  height: 150px;
  background-color: #0a0a14;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
h3 {
  margin: 0 0 0.5rem 0;
  color: white;
  font-size: 1rem;
}
.price {
  color: #ec8b00;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
}
.category {
  color: #999;
  font-size: 0.8rem;
  margin: 0 0 1rem 0;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.btn-edit, .btn-delete {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-decoration: none;
  text-align: center;
  flex: 1;
}
.btn-edit {
  background-color: #2c3e50;
  color: white;
}
.btn-edit:hover {
  background-color: #1e2b37;
}
.btn-delete {
  background-color: #c0392b;
  color: white;
  border: none;
  cursor: pointer;
}
.btn-delete:hover {
  background-color: #a93226;
}
</style>