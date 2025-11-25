'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CreateQuestionModal from '@/components/pages/Home/CreateQuestionModal';
import FilterSidebar, {
  FilterState,
} from '@/components/pages/Home/FilterSideBar';
import QuestionItem from '@/components/pages/Home/QuestionItem';
import { Icon } from '@/components/ui';
import NavBar from '@/components/ui/NavBar';
import SearchBar from '@/components/ui/SearchBar';
import colors from '@/theme/colors';
import { QuestionForm } from '@/validation/question.validation';

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    disciplines: [],
    teachers: [],
  });

  console.log(activeFilters);

  const handleCreate = (data: QuestionForm) => {
    console.log('Nova questão:', data);
    setCreateModalOpen(false);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    console.log('Filtros aplicados:', filters);
    // Aqui você aplicaria os filtros na listagem de questões
  };

  return (
    <>
      <div className="flex flex-1 items-start">
        <NavBar page="Home" />

        <div
          className="ml-[108px] flex h-full min-h-screen flex-1 flex-col"
          style={{ backgroundColor: colors.neutral.background }}
        >
          <div className="flex w-full justify-between p-5">
            <div className="flex items-center gap-4">
              <SearchBar
                borderColor={colors.neutral[20]}
                value={search}
                onChangeText={setSearch}
              />

              <div
                className="flex cursor-pointer items-center justify-center rounded-lg pb-2 pl-1 pr-2 pt-1 transition-colors hover:opacity-80"
                style={{ backgroundColor: colors.neutral[20] }}
                onClick={() => setFilterSidebarOpen(true)}
              >
                <Icon color={colors.primary[100]} name="FilterIcon" size={24} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div
                className="flex cursor-pointer items-center justify-center gap-3 transition-opacity hover:opacity-80"
                onClick={() => router.push('home/generateTest')}
              >
                <span
                  className="text-2xl font-semibold"
                  style={{ color: colors.primary[100] }}
                >
                  Gerar prova
                </span>

                <Icon color={colors.primary[100]} name="DocIcon" size={20} />
              </div>

              <div
                className="flex cursor-pointer items-center justify-center gap-3 transition-opacity hover:opacity-80"
                onClick={() => setCreateModalOpen(true)}
              >
                <span
                  className="text-2xl font-semibold"
                  style={{ color: colors.primary[100] }}
                >
                  Adicionar questão
                </span>

                <Icon color={colors.primary[100]} name="AddIcon" size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5">
            <QuestionItem
              answer1={{ label: 'Willian', correct: true }}
              answer2={{ label: 'Vini', correct: false }}
              answer3={{ label: 'Doni', correct: false }}
              answer4={{ label: 'Kenzo', correct: false }}
              answer5={{ label: 'Maka', correct: false }}
              date="25/12/2025"
              discipline="Bagriçe"
              questionText="Qual desses é bagre?"
              teacher="Maka"
            />
          </div>
        </div>
      </div>

      <CreateQuestionModal
        isOpen={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onConfirm={handleCreate}
      />

      <FilterSidebar
        isOpen={filterSidebarOpen}
        onApplyFilters={handleApplyFilters}
        onClose={() => setFilterSidebarOpen(false)}
      />
    </>
  );
};

export default Home;
