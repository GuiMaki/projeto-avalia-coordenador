'use client';

import { useState } from 'react';

import CreateDisciplineModal from '@/components/pages/Home/CreateDisciplineModal';
import EditDisciplineModal from '@/components/pages/Home/EditDisciplineModal';
import { Icon } from '@/components/ui';
import NavBar from '@/components/ui/NavBar';
import SearchBar from '@/components/ui/SearchBar';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { DisciplineForm } from '@/validation/discipline.validation';

type Discipline = {
  id: string;
  name: string;
};

// Mock de dados - substitua pela sua API
const mockDisciplines: Discipline[] = [
  { id: '1', name: 'Matemática' },
  { id: '2', name: 'Português' },
  { id: '3', name: 'História' },
  { id: '4', name: 'Geografia' },
  { id: '5', name: 'Ciências' },
  { id: '6', name: 'Inglês' },
  { id: '7', name: 'Física' },
  { id: '8', name: 'Química' },
  { id: '9', name: 'Biologia' },
  { id: '10', name: 'Educação Física' },
  { id: '11', name: 'Artes' },
];

const Disciplines = () => {
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);
  const { openModal, closeModal } = useDefaultModal();

  const handleCreate = (data: DisciplineForm) => {
    console.log('Nova disciplina:', data);
    // Aqui você faria a chamada para criar a disciplina
    // exemplo: await createDiscipline(data);
    setCreateModalOpen(false);
  };

  const handleEdit = (discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setEditModalOpen(true);
  };

  const handleEditConfirm = (data: DisciplineForm) => {
    console.log('Disciplina editada:', { id: selectedDiscipline?.id, ...data });
    // Aqui você faria a chamada para atualizar a disciplina
    // exemplo: await updateDiscipline(selectedDiscipline.id, data);
    setEditModalOpen(false);
    setSelectedDiscipline(null);
  };

  const handleDelete = (discipline: Discipline) => {
    openModal({
      title: 'Excluir disciplina',
      message: `Deseja excluir a disciplina ${discipline.name}?`,
      confirmText: 'Excluir',
      onConfirm: () => {
        console.log('Disciplina excluída:', discipline);
        closeModal();
      },
      cancelText: 'Cancelar',
      onCancel: closeModal,
    });
  };

  // Filtra disciplinas baseado na busca
  const filteredDisciplines = mockDisciplines.filter(discipline =>
    discipline.name.toLowerCase().includes(search.toLowerCase()),
  );

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
            {filteredDisciplines.length > 0 ? (
              filteredDisciplines.map(discipline => (
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
