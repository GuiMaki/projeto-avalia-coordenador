import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Icon } from '@/components/ui';
import CheckBox from '@/components/ui/CheckBox';
import colors from '@/theme/colors';

type FilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onApplyFilters: (filters: FilterState) => void;
};

export type FilterState = {
  disciplines: string[];
  teachers: string[];
};

const disciplines = [
  { label: 'Matemática', value: 'matematica' },
  { label: 'Português', value: 'portugues' },
  { label: 'História', value: 'historia' },
  { label: 'Geografia', value: 'geografia' },
  { label: 'Ciências', value: 'ciencias' },
  { label: 'Inglês', value: 'ingles' },
];

const teachers = [
  { label: 'Prof. João Silva', value: 'joao' },
  { label: 'Prof. Maria Santos', value: 'maria' },
  { label: 'Prof. Pedro Costa', value: 'pedro' },
  { label: 'Prof. Ana Lima', value: 'ana' },
];

const FilterSidebar = ({
  isOpen,
  onClose,
  onApplyFilters,
}: FilterSidebarProps) => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  const handleDisciplineToggle = (value: string) => {
    setSelectedDisciplines(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const handleTeacherToggle = (value: string) => {
    setSelectedTeachers(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const handleClearFilters = () => {
    setSelectedDisciplines([]);
    setSelectedTeachers([]);
  };

  const handleApply = () => {
    onApplyFilters({
      disciplines: selectedDisciplines,
      teachers: selectedTeachers,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop escurecido */}
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-black/50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            animate={{ x: 0 }}
            className="fixed right-0 top-0 z-50 h-full w-[400px] bg-white shadow-2xl"
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b p-5"
              style={{ borderColor: colors.neutral[20] }}
            >
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.neutral[80] }}
              >
                Filtros
              </h2>

              <button
                className="rounded-full p-2 hover:bg-neutral-100"
                onClick={onClose}
              >
                <Icon color={colors.neutral[60]} name="XIcon" size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(100%-140px)] flex-col gap-6 overflow-y-auto p-5">
              {/* Disciplinas */}
              <div>
                <h3
                  className="mb-3 text-xl font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Disciplinas
                </h3>

                <div className="flex flex-col gap-2">
                  {disciplines.map(discipline => (
                    <CheckBox
                      key={discipline.value}
                      isSelected={selectedDisciplines.includes(
                        discipline.value,
                      )}
                      label={discipline.label}
                      onClick={() => handleDisciplineToggle(discipline.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Professores */}
              <div>
                <h3
                  className="mb-3 text-xl font-semibold"
                  style={{ color: colors.neutral[80] }}
                >
                  Professores
                </h3>

                <div className="flex flex-col gap-2">
                  {teachers.map(teacher => (
                    <CheckBox
                      key={teacher.value}
                      isSelected={selectedTeachers.includes(teacher.value)}
                      label={teacher.label}
                      onClick={() => handleTeacherToggle(teacher.value)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer com botões */}
            <div
              className="absolute bottom-0 left-0 right-0 flex gap-3 border-t p-5"
              style={{ borderColor: colors.neutral[20] }}
            >
              <button
                className="flex-1 rounded-lg border py-3 text-lg font-semibold transition-colors hover:bg-neutral-50"
                style={{
                  borderColor: colors.neutral[40],
                  color: colors.neutral[80],
                }}
                onClick={handleClearFilters}
              >
                Limpar filtros
              </button>

              <button
                className="flex-1 rounded-lg py-3 text-lg font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: colors.primary[100] }}
                onClick={handleApply}
              >
                Aplicar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
