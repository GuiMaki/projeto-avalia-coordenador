import z from './zod';

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
