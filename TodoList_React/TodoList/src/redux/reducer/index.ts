import { combineReducers } from "redux";

import checkLogin from "./checkLogin";
import listTask from "./listTask";
import updateTask from "./updateTask";
import saveAccount from "./saveAccount";

const rootReducer = combineReducers({
  checkLogin: checkLogin,
  listTask: listTask,
  updateTask: updateTask,
  saveAccount: saveAccount,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
