'use client';

import { useRouter } from 'next/navigation';

import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';

import NavBarIcon from './NavBarItem';

type NavBarProps = {
  page: 'Home' | 'Teachers' | 'Disciplines';
};

const NavBar = ({ page }: NavBarProps) => {
  const router = useRouter();
  const { openModal, closeModal } = useDefaultModal();

  const handleExit = () => {
    openModal({
      title: 'Sair da conta',
      message: 'Tem certeza que deseja sair da sua conta?',
      onCancel: () => {
        closeModal();
      },
      cancelText: 'Fechar',
      onConfirm: () => {
        router.replace('/login');
      },
      confirmText: 'Sair',
    });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen flex-col items-center justify-between border-r border-neutral-300 bg-white px-2 py-6">
      <div className="flex flex-col gap-2">
        <NavBarIcon
          fill={page === 'Home' ? colors.primary[100] : colors.neutral[60]}
          icon="HomeIcon"
          label="Home"
          selected={page === 'Home'}
          onPress={() => {
            if (page !== 'Home') {
              router.replace('/home');
            }
          }}
        />

        <NavBarIcon
          icon="TeachersIcon"
          label="Professores"
          selected={page === 'Teachers'}
          onPress={() => {
            if (page !== 'Teachers') {
              router.replace('/teachers');
            }
          }}
        />

        <NavBarIcon
          icon="DisciplinesIcon"
          label="Disciplinas"
          selected={page === 'Disciplines'}
          onPress={() => {
            if (page !== 'Disciplines') {
              router.replace('/disciplines');
            }
          }}
        />
      </div>

      <NavBarIcon icon="ExitIcon" label="Sair" onPress={handleExit} />
    </div>
  );
};

export default NavBar;
