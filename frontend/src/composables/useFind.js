import { ref } from 'vue'
import API from '@/api/index.js'

export default function useFind() {
  const errors = ref([])
  const loading = ref(false)

  const find = async (item) => {
    errors.value = []

    try {
      loading.value = true
      const response = await API.findItems({ item })
      loading.value = false
      return response.data
    } catch (e) {
      if (e.response.data === 'Request cancelled') {
        errors.value = []
      } else if (e.response?.data) {
        errors.value = e.response.data
        loading.value = false
      }

      throw new Error()
    }
  }

  return {
    find,
    errors,
    loading
  }
}
