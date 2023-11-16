import { timeDefaults } from "utilities";
import { TActionProps, TTaskProps } from "../../components/types";
import { EDIT_TASK, RESET_FORM, UPDATE_TASK } from "../constant";

export default function appReducer(
  state = {
    accountId: 0,
    id: 0,
    isCompleted: false,
    isImportant: false,
    taskInit: timeDefaults(),
    taskName: "",
    taskTime: timeDefaults(),
  },
  action: TActionProps
) {
  switch (action.type) {
    case EDIT_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      return action.payload;
    }

    case RESET_FORM: {
      return {
        accountId: 0,
        id: 0,
        isCompleted: false,
        isImportant: false,
        taskInit: timeDefaults(),
        taskName: "",
        taskTime: timeDefaults(),
      };
    }

    default:
      return state;
  }
}
