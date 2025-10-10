import { create } from 'zustand';
import { UserState } from './usersTypes';
import { createUsersActions } from './createUsersActions';

export const useUserStore = create<UserState>()((...args) => ({
  ...createUsersActions(...args),
}));
