import { useMutation } from '@tanstack/react-query';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/provas';

export type TestForm = {
  titulo: string;
  idsQuestoes: number[];
  dataProva: string;
  professorResponsavelId: number;
  tipoAvaliacao: string;
  duracao: number;
  peso: number;
};

export const useCreateTest = () => {
  const createTest = async (form: TestForm) => {
    const response = await http.post(`${BASE_URL}/gerar`, form, {
      responseType: 'blob',
    });
    return response.data;
  };

  return useMutation({
    mutationFn: createTest,
  });
};
