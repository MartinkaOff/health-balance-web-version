export interface IUser {
  id: number;
  name: string;
  surname: string;
  gender: number;
  birthday: number;
  phone: string;
  email: string;
  avatar: string;
  steps: number;
  challenges: number;
  completed_challenges: number;
  role: number;
  version?: number
}

export interface IUpdateUser {
  name?: string;
  surname?: string;
  gender?: number;
  birthday?: number;
  phone?: string;
  email?: string;
  avatar?: string;
  timezone?: number;
  version?: number
}
