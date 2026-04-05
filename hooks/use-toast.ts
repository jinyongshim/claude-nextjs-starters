'use client'

import { toast } from 'sonner'

// Sonner 기반 토스트 훅
// 일관된 토스트 인터페이스 제공
export function useToast() {
  return {
    success: (message: string, description?: string) =>
      toast.success(message, { description }),
    error: (message: string, description?: string) =>
      toast.error(message, { description }),
    info: (message: string, description?: string) =>
      toast.info(message, { description }),
    warning: (message: string, description?: string) =>
      toast.warning(message, { description }),
    loading: (message: string) => toast.loading(message),
    dismiss: (id?: string | number) => toast.dismiss(id),
  }
}
