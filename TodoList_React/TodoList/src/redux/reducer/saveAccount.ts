import { TActionProps } from "components/types";
import { ACCOUNT_TASK, IS_LOGIN } from "../constant";

export default function appReducer(state = "", action: TActionProps) {
  switch (action.type) {
    case ACCOUNT_TASK: {
      return action.payload;
    }
    default:
      return state;
  }
}
