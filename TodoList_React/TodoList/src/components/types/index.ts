export interface TActionProps {
  type: string;
  payload: boolean | string | null | TTaskProps;
}

export interface TStateProps {
  checkLogin: boolean;
}
export interface TTaskProps {
  id: string;
  taskName: string;
  taskTime: string;
  taskInit: string;
  isCompleted: boolean;
  isImportant: boolean;
}