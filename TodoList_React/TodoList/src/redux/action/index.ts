import { TTaskProps } from "../../components/types";
import {
  ACCOUNT_TASK,
  ADD_TASK,
  COMPLETED_TASK,
  DELETE_ALL,
  DELETE_TASK,
  DONE_ALL_TASK,
  EDIT_TASK,
  GET_TASK_API,
  IMPORTANT_TASK,
  IS_LOGIN,
  REDO_TASK,
  RESET_FORM,
  SORT_BY_DEADLINE,
  SORT_BY_IMPORTANT,
  UPDATE_TASK,
} from "../constant";

export const checkLoginAction = (payload: boolean) => ({
  type: IS_LOGIN,
  payload: payload,
});

export const addTaskAction = (payload: TTaskProps) => ({
  type: ADD_TASK,
  payload: payload,
});

export const completedTaskAction = (payload: string) => ({
  type: COMPLETED_TASK,
  payload: payload,
});

export const redoTaskAction = (payload: string) => ({
  type: REDO_TASK,
  payload: payload,
});

export const importantTaskAction = (payload: string) => ({
  type: IMPORTANT_TASK,
  payload: payload,
});
export const doneAllTask = () => ({
  type: DONE_ALL_TASK,
});
export const sortByDeadline = () => ({
  type: SORT_BY_DEADLINE,
});
export const sortByImportant = () => ({
  type: SORT_BY_IMPORTANT,
});
export const deleteAllTaskAction = () => ({
  type: DELETE_ALL,
});
export const deleteTaskAction = (payload: string) => ({
  type: DELETE_TASK,
  payload: payload,
});

export const editTaskAction = (payload: TTaskProps) => ({
  type: EDIT_TASK,
  payload: payload,
});

export const updateTaskAction = (payload: TTaskProps) => ({
  type: UPDATE_TASK,
  payload: payload,
});

export const noteAccountAction = (payload: {
  id_account: string;
  username: string;
}) => ({
  type: ACCOUNT_TASK,
  payload: payload,
});
export const getAllTask = (payload: TTaskProps[]) => ({
  type: GET_TASK_API,
  payload: payload,
});
export const resetFormDefaults = () => {
  type: RESET_FORM
}

