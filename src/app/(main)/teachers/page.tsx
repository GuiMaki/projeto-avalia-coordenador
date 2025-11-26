'use client';

import { useState } from 'react';

import CreateTeacherModal from '@/components/pages/Home/CreateTeacherModal';
import EditTeacherModal from '@/components/pages/Home/EditTeacherModal';
import ResetPasswordModal from '@/components/pages/Home/ResetPasswordModal';
import { Icon } from '@/components/ui';
import NavBar from '@/components/ui/NavBar';
import SearchBar from '@/components/ui/SearchBar';
import { useDebounce } from '@/hooks/common';
import { ITeacher } from '@/interfaces/teachers';
import { useTeachers } from '@/services/api/teachers';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { TeacherForm } from '@/validation/teacher.validation';

const Teachers = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const { openModal, closeModal } = useDefaultModal();

  const { data } = useTeachers({ name: debouncedSearch });

  const handleCreate = (data: TeacherForm) => {
    console.log('Novo professor:', data);
    // Aqui você faria a chamada para criar o professor
    // exemplo: await createTeacher(data);
    setCreateModalOpen(false);
  };

  const handleEdit = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setEditModalOpen(true);
  };

  const handleEditConfirm = (data: TeacherForm) => {
    console.log('Professor editado:', { id: selectedTeacher?.id, ...data });
    // Aqui você faria a chamada para atualizar o professor
    // exemplo: await updateTeacher(selectedTeacher.id, data);
    setEditModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleDelete = (teacher: ITeacher) => {
    openModal({
      title: 'Excluir professor',
      message: `Deseja excluir o professor ${teacher.name}?`,
      confirmText: 'Excluir',
      onConfirm: () => {
        console.log('Professor excluído:', teacher);
        closeModal();
      },
      cancelText: 'Cancelar',
      onCancel: closeModal,
    });
  };

  return (
    <div className="flex flex-1 items-start">
      <NavBar page="Teachers" />

      <div
        className="ml-[108px] flex h-full min-h-screen flex-1 flex-col"
        style={{ backgroundColor: colors.neutral.background }}
      >
        <div className="flex items-center justify-between p-5">
          <span className="text-3xl font-semibold text-[#24366E]">
            Professores
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
                Adicionar professor
              </span>

              <Icon color={colors.primary[100]} name="AddIcon" size={20} />
            </div>
          </div>
        </div>

        {/* Tabela de professores */}
        <div className="m-5 overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead style={{ backgroundColor: colors.neutral[20] }}>
              <tr>
                <th
                  className="px-6 py-2 text-left text-lg font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Nome
                </th>

                <th
                  className="px-6 py-2 text-left text-lg font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Email
                </th>

                <th
                  className="px-6 py-2 text-left text-lg font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Disciplinas
                </th>

                <th
                  className="px-6 py-2 text-left text-lg font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Telefone
                </th>

                <th
                  className="px-6 py-2 text-center text-lg font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {data && data.length > 0 ? (
                data.map((teacher, index) => (
                  <tr
                    key={teacher.id}
                    className="transition-colors hover:bg-neutral-50"
                    style={{
                      borderTop:
                        index > 0 ? `1px solid ${colors.neutral[20]}` : 'none',
                    }}
                  >
                    <td className="px-6 py-2">
                      <span
                        className="text-lg"
                        style={{ color: colors.neutral[80] }}
                      >
                        {teacher.name}
                      </span>
                    </td>

                    <td className="px-6 py-2">
                      <span
                        className="text-lg"
                        style={{ color: colors.neutral[60] }}
                      >
                        {teacher.user.email}
                      </span>
                    </td>

                    <td className="px-6 py-2">
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map(discipline => (
                          <span
                            key={discipline.id}
                            className="rounded-full px-3 py-1 text-sm font-medium"
                            style={{
                              backgroundColor: colors.primary[100],
                              color: colors.neutral.white,
                            }}
                          >
                            {discipline.name}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-2">
                      <span
                        className="text-lg"
                        style={{ color: colors.neutral[60] }}
                      >
                        {teacher.phone}
                      </span>
                    </td>

                    <td className="px-6 py-2">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="rounded-full p-2 transition-colors hover:bg-neutral-100"
                          title="Editar"
                          onClick={() => handleEdit(teacher)}
                        >
                          <Icon
                            color={colors.neutral[60]}
                            name="EditIcon"
                            size={24}
                          />
                        </button>

                        <button
                          className="rounded-full p-2 transition-colors hover:bg-neutral-100"
                          title="Excluir"
                          onClick={() => handleDelete(teacher)}
                        >
                          <Icon
                            color={colors.neutral[60]}
                            name="DeleteIcon"
                            size={24}
                          />
                        </button>

                        <button
                          className="rounded-full p-2 transition-colors hover:bg-neutral-100"
                          title="Redefinir senha"
                          onClick={() => setResetPasswordModalOpen(true)}
                        >
                          <Icon
                            color={colors.neutral[60]}
                            name="ResetPasswordIcon"
                            size={24}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-12 text-center" colSpan={5}>
                    <span
                      className="text-xl"
                      style={{ color: colors.neutral[60] }}
                    >
                      Nenhum professor encontrado
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateTeacherModal
        isOpen={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onConfirm={handleCreate}
      />

      <EditTeacherModal
        isOpen={editModalOpen}
        teacher={selectedTeacher || undefined}
        onCancel={() => {
          setEditModalOpen(false);
          setSelectedTeacher(null);
        }}
        onConfirm={handleEditConfirm}
      />

      <ResetPasswordModal
        isOpen={resetPasswordModalOpen}
        onCancel={() => setResetPasswordModalOpen(false)}
        onConfirm={data => {
          console.log(data);
          setResetPasswordModalOpen(false);
        }}
      />
    </div>
  );
};

export default Teachers;
