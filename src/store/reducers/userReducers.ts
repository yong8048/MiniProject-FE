import { createAction, createReducer } from '@reduxjs/toolkit';
import { ILoginedUser } from '../../interfaces/store';

export const userLogin = createAction<ILoginedUser>('loginedUser/login');
export const reduceRemainDays = createAction<number>('loginedUser/reduceRemainDays');
export const removeUserInfo = createAction('loginedUser/removeUserInfo');
const loginedUser = createReducer(
  {
    id: '',
    email: '',
    username: '',
    profile: '',
    role: '',
    remainDays: 0,
    hireDate: ''
  },
  {
    // @ts-ignore
    [userLogin]: (state: ILoginedUser, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    // @ts-ignore
    [reduceRemainDays]: (state: ILoginedUser, action) => {
      return {
        ...state,
        remainDays: state.remainDays - action.payload
      };
    },
    // @ts-ignore
    [removeUserInfo]: () => {
      return {};
    }
  }
);

export default loginedUser;
