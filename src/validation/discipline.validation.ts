import z from './zod';

export const DisciplineSchema = z.object({
  name: z.string().min(1, 'Insira o nome da disciplina'),
});

export type DisciplineForm = z.infer<typeof DisciplineSchema>;
