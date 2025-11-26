import z from './zod';

export const TeacherSchema = z
  .object({
    name: z.string().min(1, 'Insira o nome do professor'),
    phone: z.string().min(1, 'Insira o telefone'),
    email: z.string().email('Email inválido').min(1, 'Insira o email'),
    disciplines: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      )
      .min(1, 'Selecione ao menos uma disciplina'),
    password: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    data => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  );

export type TeacherForm = z.infer<typeof TeacherSchema>;
