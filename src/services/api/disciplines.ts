import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { IDiscipline } from '@/interfaces/disciplines';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/disciplinas';

export const useDisciplines = (params: { name: string }) => {
  const disciplines = async () => {
    const { data } = await http.get<IDiscipline[]>(`${BASE_URL}/buscar`, {
      params,
    });
    return data;
  };

  return useQuery({
    queryKey: queryKeys.disciplines.search(params),
    queryFn: disciplines,
  });
};

export const useCreateDiscipline = () => {
  const queryClient = useQueryClient();

  const createDiscipline = async (params: { name: string }) => {
    await http.post(BASE_URL, { params });
  };

  return useMutation({
    mutationFn: createDiscipline,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.disciplines.all,
      });
    },
  });
};

export const useEditDiscipline = () => {
  const queryClient = useQueryClient();

  const editDiscipline = async (variables: {
    id: number;
    params: { name: string };
  }) => {
    const { id, params } = variables;
    await http.put(`${BASE_URL}/${id}`, { params });
  };

  return useMutation({
    mutationFn: editDiscipline,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.disciplines.all,
      });
    },
  });
};

export const useDeleteDiscipline = () => {
  const queryClient = useQueryClient();

  const deleteDiscipline = async (id: number) => {
    await http.delete(`${BASE_URL}/${id}`);
  };

  return useMutation({
    mutationFn: deleteDiscipline,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.disciplines.all,
      });
    },
  });
};
