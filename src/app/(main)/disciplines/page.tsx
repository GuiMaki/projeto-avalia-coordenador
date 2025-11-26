'use client';

import { useState } from 'react';

import CreateDisciplineModal from '@/components/pages/Home/CreateDisciplineModal';
import EditDisciplineModal from '@/components/pages/Home/EditDisciplineModal';
import { Icon } from '@/components/ui';
import NavBar from '@/components/ui/NavBar';
import SearchBar from '@/components/ui/SearchBar';
import { IDiscipline } from '@/interfaces/disciplines';
import {
  useCreateDiscipline,
  useDeleteDiscipline,
  useDisciplines,
  useEditDiscipline,
} from '@/services/api/disciplines';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { DisciplineForm } from '@/validation/discipline.validation';

const Disciplines = () => {
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<IDiscipline | null>(null);
  const { openModal, closeModal } = useDefaultModal();
  const { data } = useDisciplines({ name: search });
  const { mutateAsync: createDiscipline } = useCreateDiscipline();
  const { mutateAsync: editDiscipline } = useEditDiscipline();
  const { mutateAsync: deleteDiscipline } = useDeleteDiscipline();

  const handleCreate = async (data: DisciplineForm) => {
    await createDiscipline({ name: data.name });
    setCreateModalOpen(false);
  };

  const handleEdit = (discipline: IDiscipline) => {
    setSelectedDiscipline(discipline);
    setEditModalOpen(true);
  };

  const handleEditConfirm = async (data: DisciplineForm) => {
    await editDiscipline({
      id: selectedDiscipline?.id || 0,
      params: { name: data.name },
    });
    setEditModalOpen(false);
    setSelectedDiscipline(null);
  };

  const handleDelete = (discipline: IDiscipline) => {
    openModal({
      title: 'Excluir disciplina',
      message: `Deseja excluir a disciplina ${discipline.name}?`,
      confirmText: 'Excluir',
      onConfirm: async () => {
        await deleteDiscipline(discipline.id);
        closeModal();
      },
      cancelText: 'Cancelar',
      onCancel: closeModal,
    });
  };

  return (
    <>
      <div className="flex flex-1 items-start">
        <NavBar page="Disciplines" />

        <div
          className="ml-[108px] flex h-full min-h-screen flex-1 flex-col"
          style={{ backgroundColor: colors.neutral.background }}
        >
          <div className="flex items-center justify-between p-5">
            <span className="text-3xl font-semibold text-[#24366E]">
              Disciplinas
            </span>

            <div className="flex items-center gap-3">
              <SearchBar
                borderColor={colors.neutral[20]}
                value={search}
                onChangeText={setSearch}
              />

              <div
                className="flex cursor-pointer items-center justify-center gap-3 transition-opacity hover:opacity-80"
                onClick={() => setCreateModalOpen(true)}
              >
                <span
                  className="text-2xl font-semibold"
                  style={{ color: colors.primary[100] }}
                >
                  Adicionar disciplina
                </span>

                <Icon color={colors.primary[100]} name="AddIcon" size={20} />
              </div>
            </div>
          </div>

          {/* Grid de disciplinas */}
          <div className="m-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data && data.length > 0 ? (
              data.map(discipline => (
                <div
                  key={discipline.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
                >
                  <span
                    className="text-xl font-semibold"
                    style={{ color: colors.neutral[80] }}
                  >
                    {discipline.name}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100"
                      title="Editar"
                      onClick={() => handleEdit(discipline)}
                    >
                      <Icon
                        color={colors.neutral[60]}
                        name="EditIcon"
                        size={24}
                      />
                    </button>

                    <button
                      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100"
                      title="Excluir"
                      onClick={() => handleDelete(discipline)}
                    >
                      <Icon
                        color={colors.neutral[60]}
                        name="DeleteIcon"
                        size={24}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <span className="text-xl" style={{ color: colors.neutral[60] }}>
                  Nenhuma disciplina encontrada
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateDisciplineModal
        isOpen={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onConfirm={handleCreate}
      />

      <EditDisciplineModal
        discipline={selectedDiscipline}
        isOpen={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          setSelectedDiscipline(null);
        }}
        onConfirm={handleEditConfirm}
      />
    </>
  );
};

export default Disciplines;
