import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuth = () => {
  const user = ref(null)
  const loading = ref(false)

  const login = async (email, password) => {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email, password
    })
    if (error) throw error
    user.value = data.user
    loading.value = false
    return data
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  return { user, loading, login, logout, checkUser }
}