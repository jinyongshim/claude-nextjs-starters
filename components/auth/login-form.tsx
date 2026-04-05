'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'
import { useToast } from '@/hooks/use-toast'

// 로그인 폼 컴포넌트
// React Hook Form + Zod 검증 + Supabase 인증 처리
export function LoginForm() {
  const router = useRouter()
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    if (!supabase) {
      error('Supabase 미설정', '.env.local 에 NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 를 입력하세요.')
      return
    }

    setIsLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (signInError) {
        error('로그인에 실패했습니다.', signInError.message)
        return
      }

      success('로그인되었습니다.')
      router.push('/dashboard')
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>비밀번호</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            로그인
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{' '}
        <Link
          href="/register"
          className="text-foreground font-medium underline underline-offset-4 hover:text-primary"
        >
          회원가입
        </Link>
      </p>
    </div>
  )
}
