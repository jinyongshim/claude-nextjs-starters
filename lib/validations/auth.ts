import { z } from 'zod'

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
})

// 회원가입 폼 스키마
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    fullName: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .max(50, '이름은 50자 이하로 입력해주세요.'),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
      .max(100, '비밀번호는 100자 이하로 입력해주세요.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
