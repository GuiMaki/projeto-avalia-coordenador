import { Button } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import colors from '@/theme/colors';

export type TestModalProps = {
  isOpen: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
};

const TestModal = ({ isOpen, onClose, onConfirm }: TestModalProps) => {
  if (isOpen) {
    return (
      <DefaultModalBackdrop>
        <div className="flex h-40 w-96 items-center justify-center bg-white">
          <span>Teste de modal</span>

          <Button
            color={colors.primary}
            style={{
              width: '100%',
              backgroundColor: colors.primary,
              color: '#FFFFFF',
              cursor: 'pointer',
              borderColor: colors.primary,
            }}
            text="Confirmar"
            wired={false}
            onClick={onConfirm}
          />

          <Button
            color={colors.primary}
            style={{
              width: '100%',
              backgroundColor: colors.primary,
              color: '#FFFFFF',
              cursor: 'pointer',
              borderColor: colors.primary,
            }}
            text="Cancelar"
            wired={false}
            onClick={onClose}
          />
        </div>
      </DefaultModalBackdrop>
    );
  }
};

export default TestModal;
