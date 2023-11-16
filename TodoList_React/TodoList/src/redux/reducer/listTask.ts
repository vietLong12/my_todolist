import { TTaskProps } from "./../../components/types/index";
import { TActionProps, TTaskProps } from "../../components/types";
import { sortByDate, timeDefaults } from "../../utilities";
import {
  ADD_TASK,
  COMPLETED_TASK,
  DELETE_ALL,
  DELETE_TASK,
  DONE_ALL_TASK,
  GET_TASK_API,
  IMPORTANT_TASK,
  REDO_TASK,
  SORT_BY_DEADLINE,
  SORT_BY_IMPORTANT,
  UPDATE_TASK,
} from "../constant";
import axios from "axios";

const initialState = [];

export default function appReducer(state = [], action: TActionProps) {
  switch (action.type) {
    case COMPLETED_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
      });

      action.payload.isCompleted = true;
      axios
        .put("http://localhost:8080/tasks/updateTask", action.payload)
        .then((res) => res);
      return clonedState;
    }
    case REDO_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
      });

      return clonedState;
    }
    case IMPORTANT_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps) => {
        if (task.id === action.payload) {
          task.isImportant = !task.isImportant;
        }
      });
      return clonedState;
    }
    case DONE_ALL_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      for (let i = 0; i < clonedState.length; i++) {
        clonedState[i].isCompleted = true;
      }
      return clonedState;
    }
    case SORT_BY_DEADLINE: {
      const clonedState = JSON.parse(JSON.stringify(state));
      return sortByDate(clonedState);
    }
    case SORT_BY_IMPORTANT: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.sort((a: TTaskProps, b: TTaskProps) => {
        if (a.isImportant && !b.isImportant) return -1;
        if (!a.isImportant && b.isImportant) return 1;
        return 0;
      });
      return clonedState;
    }
    case DELETE_ALL: {
      const filteredState = state.filter(
        (task: TTaskProps) => !task.isCompleted
      );
      return filteredState;
    }
    case DELETE_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps, index: number) => {
        if (task.id === action.payload) {
          clonedState.splice(index, 1);
        }
      });
      return clonedState;
    }
    case UPDATE_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      for (let i = 0; i < clonedState.length; i++) {
        if (clonedState[i].id === action.payload.id) {
          clonedState[i].taskName = action.payload.taskName;
        }
        // clonedState.map((task: TTaskProps, index: number) => {
        //   if (task.id === action.payload.id) {
        //     task.taskName = action.payload.taskName;
        //     task.taskTime = action.payload.taskTime;
        //   }
        // });
      }
      return clonedState;
    }
    case GET_TASK_API: {
      return action.payload;
    }

    default:
      return state;
  }
}
