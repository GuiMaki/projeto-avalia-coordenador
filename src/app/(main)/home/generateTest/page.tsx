'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FilterSidebar, {
  FilterState,
} from '@/components/pages/Home/FilterSideBar';
import QuestionItemWithCheckbox from '@/components/pages/Home/QuestionItemWithCheckBox';
import { Button, Icon, Input } from '@/components/ui';
import NavBar from '@/components/ui/NavBar';
import SearchBar from '@/components/ui/SearchBar';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { TestForm, TestSchema } from '@/validation/test.validation';

const mockQuestions = [
  {
    id: '1',
    questionText: 'Qual desses é bagre?',
    discipline: 'Bagriçe',
    teacher: 'Maka',
    date: '25/12/2025',
    answer1: { label: 'Willian', correct: true },
    answer2: { label: 'Vini', correct: false },
    answer3: { label: 'Doni', correct: false },
    answer4: { label: 'Kenzo', correct: false },
    answer5: { label: 'Maka', correct: false },
  },
  {
    id: '2',
    questionText: 'Quem é o mais inteligente?',
    discipline: 'Matemática',
    teacher: 'Prof. João',
    date: '20/11/2025',
    answer1: { label: 'Einstein', correct: true },
    answer2: { label: 'Newton', correct: false },
    answer3: { label: 'Platão', correct: false },
    answer4: { label: 'Aristóteles', correct: false },
    answer5: { label: 'Sócrates', correct: false },
  },
  {
    id: '3',
    questionText: 'Capital do Brasil?',
    discipline: 'Geografia',
    teacher: 'Prof. Maria',
    date: '15/10/2025',
    answer1: { label: 'Brasília', correct: true },
    answer2: { label: 'São Paulo', correct: false },
    answer3: { label: 'Rio de Janeiro', correct: false },
    answer4: { label: 'Salvador', correct: false },
    answer5: { label: 'Recife', correct: false },
  },
];

const GenerateTest = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    disciplines: [],
    teachers: [],
  });
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const { openModal, closeModal } = useDefaultModal();

  const { control, handleSubmit, setValue } = useForm<TestForm>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      name: '',
      date: '',
      teacher: '',
      type: '',
      time: '',
      weight: '',
      questions: [],
    },
  });

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    console.log('Filtros aplicados:', filters);
  };

  const handleQuestionToggle = (questionId: string) => {
    setSelectedQuestions(prev => {
      const newSelection = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];

      setValue(
        'questions',
        newSelection.map(id => ({ id, points: 1 })),
      );

      return newSelection;
    });
  };

  const onSubmit = (data: TestForm) => {
    console.log('Dados da prova:', data);
    console.log('Questões selecionadas:', selectedQuestions);
    router.replace('/home');

    openModal({
      title: 'Sucesso!',
      message: 'Prova gerada com sucesso!',
      confirmText: 'Fechar',
      onConfirm: closeModal,
    });
  };

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.questionText
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDiscipline = activeFilters.disciplines.length === 0;

    const matchesTeacher = activeFilters.teachers.length === 0;

    return matchesSearch && matchesDiscipline && matchesTeacher;
  });

  return (
    <>
      <div className="flex flex-1 items-start">
        <NavBar page="Home" />

        <div
          className="ml-[108px] flex h-full min-h-screen flex-1 flex-col"
          style={{ backgroundColor: colors.neutral.background }}
        >
          <div
            className="flex items-center justify-between border-b p-5"
            style={{ borderColor: colors.neutral[20] }}
          >
            <h1
              className="text-3xl font-bold"
              style={{ color: colors.neutral[80] }}
            >
              Gerar Prova
            </h1>

            <div className="flex items-center gap-3">
              <Button
                className="rounded-lg px-8 py-2 text-white"
                color={colors.neutral[40]}
                text="Voltar"
                onClick={() => router.back()}
              />

              <Button
                className="rounded-lg px-8 py-2 text-white"
                text="Gerar Prova"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>

          <div
            className="border-b p-5"
            style={{ borderColor: colors.neutral[20] }}
          >
            <h2
              className="mb-4 text-2xl font-semibold"
              style={{ color: colors.neutral[80] }}
            >
              Informações da Prova
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Input
                control={control}
                label="Nome da Prova"
                name="name"
                placeholder="Ex: Prova Bimestral"
              />

              <Input
                control={control}
                label="Data"
                name="date"
                placeholder="DD/MM/AAAA"
                type="date"
              />

              <Input
                control={control}
                label="Professor"
                name="teacher"
                placeholder="Nome do professor"
              />

              <Input
                control={control}
                label="Tipo de Avaliação"
                name="type"
                placeholder="Ex: Prova, Simulado, Teste"
              />

              <Input
                control={control}
                label="Duração (minutos)"
                name="time"
                placeholder="Ex: 60"
                type="number"
              />

              <Input
                control={control}
                label="Peso"
                name="weight"
                placeholder="Ex: 2.5"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-2xl font-semibold"
                style={{ color: colors.neutral[80] }}
              >
                Selecionar Questões ({selectedQuestions.length} selecionadas)
              </h2>

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
                  <Icon
                    color={colors.primary[100]}
                    name="FilterIcon"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map(question => (
                  <QuestionItemWithCheckbox
                    key={question.id}
                    answer1={question.answer1}
                    answer2={question.answer2}
                    answer3={question.answer3}
                    answer4={question.answer4}
                    answer5={question.answer5}
                    date={question.date}
                    discipline={question.discipline}
                    isSelected={selectedQuestions.includes(question.id)}
                    questionText={question.questionText}
                    teacher={question.teacher}
                    onToggle={() => handleQuestionToggle(question.id)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-xl" style={{ color: colors.neutral[60] }}>
                    Nenhuma questão encontrada
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FilterSidebar
        isOpen={filterSidebarOpen}
        onApplyFilters={handleApplyFilters}
        onClose={() => setFilterSidebarOpen(false)}
      />
    </>
  );
};

export default GenerateTest;
