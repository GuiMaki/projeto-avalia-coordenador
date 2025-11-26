import { IDiscipline } from './disciplines';

export type ITeacher = {
  id: number;
  user: User;
  name: string;
  phone: string;
  subjects: IDiscipline[];
};

export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type Authority = {
  authority: string;
};
