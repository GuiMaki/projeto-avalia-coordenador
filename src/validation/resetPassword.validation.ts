import z from './zod';

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Za-z]/, 'A senha deve conter ao menos 1 letra')
      .regex(/[0-9]/, 'A senha deve conter ao menos 1 número'),

    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Za-z]/, 'A senha deve conter ao menos 1 letra')
      .regex(/[0-9]/, 'A senha deve conter ao menos 1 número'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
