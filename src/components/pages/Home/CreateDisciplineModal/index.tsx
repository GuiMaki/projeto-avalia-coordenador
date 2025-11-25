import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import {
  DisciplineForm,
  DisciplineSchema,
} from '@/validation/discipline.validation';

type CreateDisciplineModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (data: DisciplineForm) => void;
};

const CreateDisciplineModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: CreateDisciplineModalProps) => {
  const { control, handleSubmit, reset } = useForm<DisciplineForm>({
    resolver: zodResolver(DisciplineSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const handleConfirm = (data: DisciplineForm) => {
    onConfirm(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-auto w-[500px] flex-col overflow-hidden rounded-lg border-neutral-200 bg-white">
        <DefaultModalHeader title="Cadastrar Disciplina" />

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
          confirmText="Cadastrar"
          handleCancel={handleCancel}
          handleConfirm={handleSubmit(handleConfirm)}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default CreateDisciplineModal;
