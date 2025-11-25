import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import {
  ResetPasswordForm,
  ResetPasswordSchema,
} from '@/validation/resetPassword.validation';

type ResetPasswordModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (data: ResetPasswordForm) => void;
};

const ResetPasswordModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: ResetPasswordModalProps) => {
  const { control, handleSubmit, reset } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-auto max-h-[90vh] w-[450px] flex-col overflow-hidden rounded-lg border-neutral-200 bg-white">
        <DefaultModalHeader title="Redefinir Senha" />

        <div className="flex grow flex-col gap-4 overflow-y-auto p-4">
          <Input
            control={control}
            label="Nova Senha"
            name="newPassword"
            placeholder="Digite a nova senha"
            type="password"
          />

          <Input
            control={control}
            label="Confirmar Nova Senha"
            name="confirmPassword"
            placeholder="Confirme a nova senha"
            type="password"
          />
        </div>

        <DefaultModalFooter
          cancelText="Cancelar"
          confirmText="Salvar"
          handleCancel={() => {
            reset();
            onCancel();
          }}
          handleConfirm={handleSubmit(onConfirm)}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default ResetPasswordModal;
