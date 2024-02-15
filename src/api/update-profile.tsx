import { api } from '@/lib/axios'

interface UpdateProfileResponse {
  name: string
  description: string | null
}

export async function updateProfile({
  name,
  description,
}: UpdateProfileResponse) {
  // Teste real em produção dando tempo para a requisição falhar
  // await new Promise((resolve, reject) => setTimeout(reject, 3000))

  await api.put('/profile', { name, description })
}
