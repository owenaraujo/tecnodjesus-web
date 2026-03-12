<template>
  <div :class="['app', theme]">
    <header class="main-header">
      <div class="logo-container">
        <div class="isotipo">
          <img src="https://res.cloudinary.com/dn9dlda5v/image/upload/v1773115146/tecnodjesus/isotype_alternative_zbs3cw.png">
        </div>
        <h1>Tecno <span class="naranja">DJesus</span></h1>
      </div>
      <nav class="main-nav">
        <a href="#inicio" @click.prevent="scrollTo('inicio')">Inicio</a>
        <a href="#productos" @click.prevent="scrollTo('productos')">Productos</a>
        <a href="#contacto" @click.prevent="scrollTo('contacto')">Contacto</a>
        <a href="#" @click.prevent="openQuoteModal">Cotización</a>
      </nav>
      <button @click="toggleTheme" class="theme-toggle">
        {{ theme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </header>

    <div v-if="showQuoteModal" class="modal-overlay" @click.self="closeQuoteModal">
      <div class="modal-content">
        <h2>📱 Cuéntanos qué le pasa a tu equipo</h2>
        <p class="modal-subtitle">Estamos aquí para ayudarte, cuéntanos los detalles y te daremos un presupuesto sin compromiso.</p>
        <form @submit.prevent="sendQuote">
          <div class="form-group">
            <label for="brand">Marca:</label>
            <select id="brand" v-model="quoteForm.brand" required>
              <option value="">Selecciona una marca</option>
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Motorola">Motorola</option>
              <option value="Huawei">Huawei</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div class="form-group">
            <label for="model">Modelo:</label>
            <input type="text" id="model" v-model="quoteForm.model" placeholder="Ej: Galaxy S21, iPhone 12" required>
          </div>
          <div class="form-group">
            <label for="issue">Tipo de problema:</label>
            <select id="issue" v-model="quoteForm.issue" required>
              <option value="">Selecciona el problema principal</option>
              <option value="pantalla">Pantalla rota / no táctil</option>
              <option value="bateria">Batería se descarga rápido / no prende</option>
              <option value="vidrio">Vidrio trasero roto</option>
              <option value="carga">No carga / carga lenta</option>
              <option value="humedad">Se mojó / humedad</option>
              <option value="otro">Otro (cuéntanos abajo)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description">Breve descripción del daño (opcional pero recomendado):</label>
            <textarea id="description" v-model="quoteForm.description" rows="3" placeholder="Ej: La pantalla se ve con líneas, o el celular se calienta mucho, o se cayó y no enciende..."></textarea>
            <div class="photo-note">
              📸 <strong>Consejo:</strong> Si es posible, al enviar el mensaje de WhatsApp puedes adjuntar una foto de la pantalla y la parte posterior del equipo. ¡Así podemos asesorarte mucho mejor!
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Enviar cotización por WhatsApp</button>
            <button type="button" @click="closeQuoteModal" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <section id="inicio" class="hero">
      <div class="hero-content">
        <h2>Servicio técnico y venta de accesorios</h2>
        <p>Reparación de celulares y venta de accesorios, con asesoría gratuita.</p>
        <div class="hero-buttons">
          <a href="#productos" class="btn btn-primary">Ver Productos</a>
          <a href="https://wa.me/573505456465" target="_blank" class="btn btn-secondary">WhatsApp</a>
        </div>
      </div>
    </section>

    <section id="productos" class="products-section">
      <h2 class="section-title">Nuestros Productos</h2>
      <div v-if="productsLoading" class="text-center py-8">Cargando productos...</div>
      <div v-else class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="image-gallery">
            <!-- Miniaturas -->
            <div v-if="product.product_images && product.product_images.length" class="gallery-thumbnails">
              <img
                v-for="(img, idx) in product.product_images.slice(0, 3)"
                :key="img.id"
                :src="img.image_url"
                :alt="product.name"
                class="thumbnail"
                @click="selectImage(product.id, img.image_url)"
              >
            </div>
            <img
              v-if="selectedImages[product.id]"
              :src="selectedImages[product.id]"
              class="main-image"
            >
            <img
              v-else-if="product.product_images && product.product_images.length"
              :src="product.product_images[0].image_url"
              class="main-image"
            >
            <img
              v-else
              :src="`https://via.placeholder.com/150?text=${product.name}`"
              class="main-image"
            >
          </div>
          <h3>{{ product.name }}</h3>
          <a style="font-size: 15px;"> {{product.description}}</a>
          <p class="price" v-if="product.price">${{ product.price.toLocaleString() }}</p>
          <a :href="`https://wa.me/573505456465?text=${encodeURIComponent('Hola, me interesa: ' + product.name)}`" target="_blank" class="whatsapp-btn">Consultar</a>
        </div>
      </div>
    </section>

    <section class="asesoria">
      <h2>¿Tienes dudas? <span>Te asesoramos gratis</span></h2>
      <p>Escríbenos por WhatsApp y te ayudamos a elegir el mejor producto o solución para tu equipo.</p>
      <a href="https://wa.me/573505456465" target="_blank" class="whatsapp-btn large">Contactar por WhatsApp</a>
    </section>

    <section id="contacto" class="contact-section">
      <h2 class="section-title">Contacto</h2>
      <div class="contact-info">
        <p><strong>📍 Dirección:</strong> calle 61 #11-09 chapinero bogota</p>
        <p><strong>📱 WhatsApp:</strong> +57 350 5456 465</p>
        <p><strong>🕒 Horario:</strong> Lun-Vie 9am-7pm, Sáb 9am-7pm</p>
      </div>
      <div class="map-placeholder">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4427.746299047599!2d-74.06579492648757!3d4.647020317128223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b02d91646ab%3A0xae0b87805af1fd9f!2sServicio%20T%C3%A9cnico%20Tecno%20D%20jesus!5e0!3m2!1ses-419!2sco!4v1773112273775!5m2!1ses-419!2sco" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>

    <a href="https://wa.me/573505456465" target="_blank" class="whatsapp-float">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
    </a>

    <footer>
      <div class="social-links">
        <a href="https://instagram.com/tecno_djesus" target="_blank" class="social-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram">
          <span>@tecno_djesus</span>
        </a>
        <a href="https://tiktok.com/@tecnodjesus" target="_blank" class="social-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok">
          <span>@tecnodjesus</span>
        </a>
      </div>
      <p>&copy; 2025 <span class="naranja">Tecno DJesus</span> - Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useProducts } from '../composables/useProducts'

const { products, loading: productsLoading, fetchProducts } = useProducts()
const theme = ref('dark')
const showQuoteModal = ref(false)
const selectedImages = reactive({})

const quoteForm = ref({
  brand: '',
  model: '',
  issue: '',
  description: ''
})

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  }
  fetchProducts()
})

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
}

const scrollTo = (sectionId) => {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const closeQuoteModal = () => {
  showQuoteModal.value = false
  quoteForm.value = { brand: '', model: '', issue: '', description: '' }
}

const sendQuote = () => {
  let message = `Hola, vengo de la web y necesito una cotización para mi equipo:%0A%0A`
  message += `*Marca:* ${quoteForm.value.brand}%0A`
  message += `*Modelo:* ${quoteForm.value.model}%0A`
  message += `*Problema principal:* ${quoteForm.value.issue}%0A`
  if (quoteForm.value.description.trim()) {
    message += `*Descripción adicional:* ${quoteForm.value.description}%0A`
  }
  message += `%0A¿Podrían indicarme el costo y la disponibilidad? ¡Gracias!`
  
  window.open(`https://wa.me/573505456465?text=${message}`, '_blank')
  closeQuoteModal()
}

const selectImage = (productId, imageUrl) => {
  selectedImages[productId] = imageUrl
}
</script>

<style scoped>
.app {
  --color-bg: #121121;
  --color-text: white;
  --color-card-bg: #1e1e2f;
  --color-border: #333;
  --color-hero-bg: linear-gradient(135deg, #1e1e2f 0%, #121121 100%);
  --color-footer-bg: #0a0a14;
  --color-nav-hover: #ec8b00;
  --color-section-title: #ec8b00;
  --color-btn-primary-bg: #ec8b00;
  --color-btn-primary-text: white;
  --color-btn-secondary-border: #ec8b00;
  --color-btn-secondary-text: white;
  --color-btn-secondary-hover-bg: #ec8b00;
  --color-btn-secondary-hover-text: white;
  --color-whatsapp-btn-bg: #ec8b00;
  --color-whatsapp-btn-text: white;
  --color-whatsapp-btn-hover: #d47a00;
  --color-float-bg: #25D366;
  --color-footer-text: #ccc;
  transition: background-color 0.3s, color 0.3s;
}

.app.light {
  --color-bg: #f5f5f5;
  --color-text: #333;
  --color-card-bg: white;
  --color-border: #ddd;
  --color-hero-bg: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  --color-footer-bg: #e0e0e0;
  --color-nav-hover: #ec8b00;
  --color-section-title: #ec8b00;
  --color-btn-primary-bg: #ec8b00;
  --color-btn-primary-text: white;
  --color-btn-secondary-border: #ec8b00;
  --color-btn-secondary-text: #333;
  --color-btn-secondary-hover-bg: #ec8b00;
  --color-btn-secondary-hover-text: white;
  --color-whatsapp-btn-bg: #ec8b00;
  --color-whatsapp-btn-text: white;
  --color-whatsapp-btn-hover: #d47a00;
  --color-float-bg: #25D366;
  --color-footer-text: #666;
}

.app {
  background-color: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
}

.naranja {
  color: #ec8b00 !important;
}

/* Header */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: var(--color-bg);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid #ec8b00;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.isotipo {
  width: 40px;
  height: 40px;
  background-color: #ec8b00;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  overflow: hidden;
}
.isotipo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-container h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--color-text);
}
.logo-container h1 .naranja {
  color: #ec8b00;
}

.main-nav {
  display: flex;
  gap: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.main-nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
}
.main-nav a:hover {
  color: var(--color-nav-hover);
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-card-bg);
  color: var(--color-text);
  margin-left: 20px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: var(--color-card-bg);
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.modal-content h2 {
  color: #ec8b00;
  margin-top: 0;
  text-align: center;
  font-size: 1.8rem;
}
.modal-subtitle {
  text-align: center;
  margin-bottom: 25px;
  color: var(--color-text);
  opacity: 0.9;
  font-size: 1.1rem;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--color-text);
}
.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
}
.form-group textarea {
  resize: vertical;
  font-family: inherit;
}
.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ec8b00;
}
.photo-note {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.9;
  background-color: rgba(236, 139, 0, 0.1);
  padding: 8px 12px;
  border-radius: 5px;
  border-left: 3px solid #ec8b00;
}
.photo-note strong {
  color: #ec8b00;
}
.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
.form-actions .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.form-actions .btn-primary {
  background-color: #ec8b00;
  color: white;
}
.form-actions .btn-primary:hover {
  background-color: #d47a00;
}
.form-actions .btn-secondary {
  background-color: transparent;
  border: 2px solid #ec8b00;
  color: #ec8b00;
}
.form-actions .btn-secondary:hover {
  background-color: #ec8b00;
  color: white;
}

/* Secciones */
.hero {
  background: var(--color-hero-bg);
  padding: 80px 20px;
  text-align: center;
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
}
.hero h2 {
  font-size: 2.5rem;
  color: #ec8b00;
  margin-bottom: 20px;
}
.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: var(--color-text);
}
.hero-buttons .btn {
  display: inline-block;
  padding: 12px 30px;
  margin: 0 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
}
.btn-primary {
  background-color: var(--color-btn-primary-bg);
  color: var(--color-btn-primary-text);
}
.btn-primary:hover {
  background-color: #d47a00;
}
.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--color-btn-secondary-border);
  color: var(--color-btn-secondary-text);
}
.btn-secondary:hover {
  background-color: var(--color-btn-secondary-hover-bg);
  color: var(--color-btn-secondary-hover-text);
}
.section-title {
  color: var(--color-section-title);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
}
.products-section {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.product-card {
  background-color: var(--color-card-bg);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.product-card:hover {
  transform: translateY(-5px);
}
.image-gallery {
  margin-bottom: 10px;
}
.gallery-thumbnails {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-bottom: 8px;
}
.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}
.thumbnail:hover {
  border-color: #ec8b00;
}
.main-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 4px;
  background-color: var(--color-bg);
}
.product-card h3 {
  font-size: 1rem;
  margin: 10px 0 5px;
  color: var(--color-text);
}
.price {
  color: #ec8b00;
  font-weight: bold;
  margin-bottom: 10px;
}
.whatsapp-btn {
  display: inline-block;
  background-color: var(--color-whatsapp-btn-bg);
  color: var(--color-whatsapp-btn-text);
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
}
.whatsapp-btn:hover {
  background-color: var(--color-whatsapp-btn-hover);
}
.asesoria {
  background-color: #ec8b00;
  color: white;
  padding: 60px 20px;
  text-align: center;
  margin: 40px 0;
}
.asesoria h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
}
.asesoria h2 span {
  font-weight: bold;
}
.asesoria p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 30px;
  color: white;
}
.asesoria .whatsapp-btn.large {
  background-color: white;
  color: #ec8b00;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  transition: background-color 0.2s;
}
.asesoria .whatsapp-btn.large:hover {
  background-color: #f0f0f0;
}
.contact-section {
  background-color: var(--color-card-bg);
  padding: 60px 20px;
  text-align: center;
}
.contact-info {
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text);
  line-height: 2;
}
.contact-info p {
  margin: 10px 0;
}
.map-placeholder {
  margin-top: 30px;
  width: 100%;
  height: 300px;
  background-color: #2a2a3a;
  border-radius: 8px;
  overflow: hidden;
}
.map-placeholder iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: var(--color-float-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 99;
}
.whatsapp-float img {
  width: 35px;
  height: 35px;
}
footer {
  text-align: center;
  padding: 20px;
  color: var(--color-footer-text);
  background-color: var(--color-footer-bg);
}
footer .naranja {
  color: #ec8b00;
}
.social-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 15px;
}
.social-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s;
}
.social-icon:hover {
  color: #ec8b00;
}
.social-icon img {
  width: 24px;
  height: 24px;
  filter: brightness(0.9);
}
.social-icon:hover img {
  filter: brightness(1.2);
}
.text-center {
  text-align: center;
}
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
