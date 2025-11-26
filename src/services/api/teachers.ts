import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { ITeacher } from '@/interfaces/teachers';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/professores';

export const useTeachers = (params: { name: string }) => {
  const teachers = async () => {
    const { data } = await http.get<ITeacher[]>(`${BASE_URL}/buscar`, {
      params,
    });
    return data;
  };

  return useQuery({
    queryKey: queryKeys.teachers.search(params),
    queryFn: teachers,
  });
};

export type CreateTeacherForm = {
  name: string;
  email: string;
  phone: string;
  subjectIds: number[];
  password: string;
  confirmPassword: string;
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  const createTeacher = async (form: CreateTeacherForm) => {
    await http.post(BASE_URL, form);
  };

  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.teachers.all,
      });
    },
  });
};

export type EditTeacherForm = {
  name: string;
  email: string;
  phone: string;
  subjectIds: number[];
};

export const useEditTeacher = () => {
  const queryClient = useQueryClient();

  const editTeacher = async (variables: {
    id: number;
    form: EditTeacherForm;
  }) => {
    const { id, form } = variables;
    await http.post(`${BASE_URL}/${id}`, form);
  };

  return useMutation({
    mutationFn: editTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.teachers.all,
      });
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  const deleteTeacher = async (id: number) => {
    await http.delete(`${BASE_URL}/${id}`);
  };

  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.disciplines.all,
      });
    },
  });
};

export type ChangePasswordForm = {
  novaSenha: string;
  confirmSenha: string;
};

export const useEditTeacherPassword = () => {
  const queryClient = useQueryClient();

  const editTeacherPassword = async (variables: {
    id: number;
    form: ChangePasswordForm;
  }) => {
    const { id, form } = variables;
    await http.post(`${BASE_URL}/${id}/senha`, form);
  };

  return useMutation({
    mutationFn: editTeacherPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.teachers.all,
      });
    },
  });
};
