<template>
  <div class="form-container">
    <h2>{{ editing ? 'Editar' : 'Nuevo' }} Producto</h2>
    <form @submit.prevent="saveProduct">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" v-model="form.name" required>
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="form.description" rows="3"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Precio</label>
          <input type="number" step="0.01" v-model.number="form.price" required>
        </div>
        <div class="form-group">
          <label>Categoría</label>
          <select v-model="form.category">
            <option value="">Seleccionar</option>
            <option value="cargadores">Cargadores</option>
            <option value="cables">Cables</option>
            <option value="fundas">Fundas</option>
            <option value="audifonos">Audífonos</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Imágenes del producto (puedes seleccionar varias)</label>
        <input type="file" multiple accept="image/*" @change="handleImageUpload">
        <div class="image-previews">
          <div v-for="(preview, index) in imagePreviews" :key="index" class="preview">
            <img :src="preview" alt="Preview">
            <button type="button" @click="removeImage(index)" class="remove">×</button>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>
        <router-link to="/admin/productos" class="btn-secondary">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProducts } from '../../composables/useProducts'
import { useRouter, useRoute } from 'vue-router'

const { createProduct, updateProduct, fetchProducts, products } = useProducts()
const router = useRouter()
const route = useRoute()

const editing = ref(false)
const loading = ref(false)
const form = ref({
  name: '',
  description: '',
  price: null,
  category: ''
})
const imageFiles = ref([])
const imagePreviews = ref([])

onMounted(async () => {
  if (route.params.id) {
    editing.value = true
    await fetchProducts()
    const product = products.value.find(p => p.id === parseInt(route.params.id))
    if (product) {
      form.value = { ...product }
      // Si quieres cargar imágenes existentes, puedes hacerlo aquí
    }
  }
})

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  imageFiles.value.push(...files)
  
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  imageFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const saveProduct = async () => {
  loading.value = true
  try {
    if (editing.value) {
      await updateProduct(route.params.id, form.value, imageFiles.value)
    } else {
      await createProduct(form.value, imageFiles.value)
    }
    router.push('/admin/productos')
  } catch (error) {
    alert('Error al guardar: ' + error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #1e1e2f;
  padding: 2rem;
  border-radius: 8px;
}
h2 {
  margin-top: 0;
  margin-bottom: 2rem;
  color: white;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
}
input, textarea, select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #121121;
  color: white;
}
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #ec8b00;
}
.image-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.preview {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
}
.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.remove {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.7);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.remove:hover {
  background-color: rgba(255,0,0,0.8);
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
}
.btn-primary {
  background-color: #ec8b00;
  color: white;
  border: none;
  cursor: pointer;
}
.btn-primary:hover:not(:disabled) {
  background-color: #d47a00;
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-secondary {
  background-color: transparent;
  border: 1px solid #ec8b00;
  color: #ec8b00;
}
.btn-secondary:hover {
  background-color: #ec8b00;
  color: white;
}
</style>