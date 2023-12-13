export type User = {
  id: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  updatedAt: number;
}

export type UserStore = {
  isAuthorized: boolean;
  isLoading: boolean;
  data?: User;
};