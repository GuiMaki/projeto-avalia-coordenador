import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import MultiSelectDropdown from '@/components/ui/MultiSelectDropdown/index';
import { TeacherForm, TeacherSchema } from '@/validation/teacher.validation';

const disciplines = [
  { label: 'Matemática', value: 'matematica' },
  { label: 'Português', value: 'portugues' },
  { label: 'História', value: 'historia' },
  { label: 'Geografia', value: 'geografia' },
  { label: 'Ciências', value: 'ciencias' },
  { label: 'Inglês', value: 'ingles' },
  { label: 'Física', value: 'fisica' },
  { label: 'Química', value: 'quimica' },
  { label: 'Biologia', value: 'biologia' },
  { label: 'Educação Física', value: 'educacao_fisica' },
  { label: 'Artes', value: 'artes' },
];

type EditTeacherModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (data: TeacherForm) => void;
  teacher: {
    name: string;
    phone: string;
    email: string;
    disciplines: string[];
  } | null;
};

const EditTeacherModal = ({
  isOpen,
  onCancel,
  onConfirm,
  teacher,
}: EditTeacherModalProps) => {
  const { control, handleSubmit, reset } = useForm<TeacherForm>({
    resolver: zodResolver(TeacherSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      disciplines: [],
    },
  });

  useEffect(() => {
    if (isOpen && teacher) {
      reset({
        name: teacher.name,
        phone: teacher.phone,
        email: teacher.email,
        disciplines: teacher.disciplines,
      });
    }
  }, [isOpen, teacher, reset]);

  if (!isOpen || !teacher) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-auto max-h-[90vh] w-[600px] flex-col overflow-hidden rounded-lg border-neutral-200 bg-white">
        <DefaultModalHeader title="Editar Professor" />

        <div className="flex grow flex-col gap-4 overflow-y-auto p-4">
          <Input
            control={control}
            label="Nome completo"
            name="name"
            placeholder="Digite o nome do professor"
          />

          <Input
            control={control}
            label="Telefone"
            mask="(00) 00000-0000"
            name="phone"
            placeholder="(00) 00000-0000"
          />

          <Input
            control={control}
            label="Email"
            name="email"
            placeholder="email@exemplo.com"
            type="email"
          />

          <MultiSelectDropdown
            control={control}
            label="Disciplinas"
            name="disciplines"
            options={disciplines}
            placeholder="Selecione as disciplinas"
          />
        </div>

        <DefaultModalFooter
          cancelText="Cancelar"
          confirmText="Salvar"
          handleCancel={onCancel}
          handleConfirm={handleSubmit(onConfirm)}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default EditTeacherModal;
