import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useProducts = () => {
  const products = ref([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    products.value = data
    loading.value = false
  }

  const createProduct = async (productData, imageFiles) => {
    loading.value = true

    // Insertar producto
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category
      }])
      .select()
      .single()
    if (productError) throw productError

    // Subir imágenes
    const imageUrls = []
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      const filePath = `products/${product.id}/${Date.now()}_${file.name}`
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      imageUrls.push({
        product_id: product.id,
        image_url: publicUrl,
        is_main: i === 0,
        sort_order: i
      })
    }

    if (imageUrls.length > 0) {
      const { error: imagesError } = await supabase
        .from('product_images')
        .insert(imageUrls)
      if (imagesError) throw imagesError
    }

    loading.value = false
    return product
  }

  const deleteProduct = async (id) => {
    loading.value = true
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw error
    loading.value = false
  }

  const updateProduct = async (id, updates, newImages = []) => {
    loading.value = true
    const { error: updateError } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    if (updateError) throw updateError

    if (newImages.length > 0) {
      // Similar a createProduct pero para este producto
      // (puedes implementar según necesites)
    }
    loading.value = false
  }

  return {
    products,
    loading,
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct
  }
}