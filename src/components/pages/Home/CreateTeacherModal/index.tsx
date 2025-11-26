import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import MultiSelectDropdown from '@/components/ui/MultiSelectDropdown/index';
import { useDisciplines } from '@/services/api/disciplines';
import { TeacherForm, TeacherSchema } from '@/validation/teacher.validation';

type CreateTeacherModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (data: TeacherForm) => void;
};

const CreateTeacherModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: CreateTeacherModalProps) => {
  const { data } = useDisciplines({ name: '' });

  const { control, handleSubmit, reset } = useForm<TeacherForm>({
    resolver: zodResolver(TeacherSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      disciplines: [],
      password: '',
      confirmPassword: '',
    },
  });

  const handleConfirm = (data: TeacherForm) => {
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
      <dialog className="relative flex h-auto max-h-[90vh] w-[600px] flex-col overflow-hidden rounded-lg border-neutral-200 bg-white">
        <DefaultModalHeader title="Cadastrar Professor" />

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
            options={data || []}
            placeholder="Selecione as disciplinas"
          />

          <Input
            password
            control={control}
            label="Senha"
            name="password"
            placeholder="Mínimo 6 caracteres"
          />

          <Input
            password
            control={control}
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="Digite a senha novamente"
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

export default CreateTeacherModal;
