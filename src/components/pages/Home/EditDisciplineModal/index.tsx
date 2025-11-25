import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import {
  DisciplineForm,
  DisciplineSchema,
} from '@/validation/discipline.validation';

type EditDisciplineModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (data: DisciplineForm) => void;
  discipline: {
    name: string;
  } | null;
};

const EditDisciplineModal = ({
  isOpen,
  onCancel,
  onConfirm,
  discipline,
}: EditDisciplineModalProps) => {
  const { control, handleSubmit, reset } = useForm<DisciplineForm>({
    resolver: zodResolver(DisciplineSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (isOpen && discipline) {
      reset({
        name: discipline.name,
      });
    }
  }, [isOpen, discipline, reset]);

  if (!isOpen || !discipline) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-auto w-[500px] flex-col overflow-hidden rounded-lg border-neutral-200 bg-white">
        <DefaultModalHeader title="Editar Disciplina" />

        <div className="flex flex-col gap-4 p-4">
          <Input
            control={control}
            label="Nome da disciplina"
            name="name"
            placeholder="Digite o nome da disciplina"
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

export default EditDisciplineModal;
