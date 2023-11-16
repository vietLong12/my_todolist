import React, { useEffect, useRef, useState } from "react";
import s from "./todotask.module.css";
import { AddCircle } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { TTaskProps } from "components/types";
import { addTaskAction, updateTaskAction } from "redux/action";
import { Toast } from "react-bootstrap";
import { timeDefaults, generateRandomId } from "utilities";
import { RootState } from "redux/reducer";
import Swal from "sweetalert2";
import axios from "axios";

export interface TTodoTaskProps {
  setShowUpdate: (a: boolean) => void;
  isShowUpdate: boolean;
}

const TodoTask: React.FC<TTodoTaskProps> = ({
  setShowUpdate,
  isShowUpdate,
  isRender,
  setRender,
  listTask,
  setListTask,
}) => {
  const [showA, setShowA] = useState(false);
  const [valueTextArea, setValueTextArea] = useState("");
  const [valueTime, setValueTime] = useState(timeDefaults());

  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useDispatch();
  const taskEdit = useSelector((store) => store.updateTask);
  const userData = useSelector((store) => store.saveAccount);

  const handleOnSubmit = (e) => {
    if (valueTextArea === "") {
      Swal.fire({
        title: "Tên công việc không được để trống!!",
        icon: "warning",
        showConfirmButton: true,
      });
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.target.reset();
    const headers = { "Access-Control-Allow-Origin": "*" };
    const data = {
      taskName: valueTextArea,
      taskInit: timeDefaults(),
      taskTime: valueTime,
      isCompleted: false,
      isImportant: false,
      accountId: userData.id_account,
    };
    axios
      .post("http://localhost:8080/tasks", data, headers)
      .then((res) => res)
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
          showConfirmButton: true,
        });
      });
    setRender(!isRender);
    setValueTextArea("");
    setValueTime(timeDefaults());
    setShowA(true);
    setTimeout(() => setShowA(false), 2000);

    Swal.fire({
      title: "Thêm công việc thành công",
      icon: "success",
      timer: 2000, // Hiển thị trong 2 giây
      showConfirmButton: false,
    });
  };

  const handleUpdateTask = () => {
    const url = `http://localhost:8080/tasks/updateTask`;
    const headers = { "Access-Control-Allow-Origin": "*" };

    const data = {
      ...taskEdit,
      taskName: valueTextArea,
      taskTime: valueTime,
    };

    axios
      .put(url, data, headers)
      .then((res) => {
        if (res.data === "updated") {
          Swal.fire({
            title: "Cập nhật thành công",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: res.data,
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setValueTextArea("");
        setValueTime(timeDefaults());
        setRender(!isRender);
      });

    setShowUpdate(false);
  };

  useEffect(() => {
    setValueTextArea(taskEdit.taskName);
    setValueTime(timeDefaults());
  }, []);

  useEffect(() => {
    setValueTextArea(taskEdit.taskName);
    setValueTime(taskEdit.taskTime);
  }, [taskEdit]);

  return (
    <div className={`${s.todoTask}`}>
      <h1> Todo Tasks</h1>
      <form onSubmit={handleOnSubmit} ref={formRef}>
        <div className="form-group mb-2">
          <label htmlFor="valueTextArea">Công việc</label>
          <textarea
            className="form-control"
            id="valueTextArea"
            rows={3}
            value={undefined ? "" : valueTextArea}
            placeholder="📝 Thêm một công việc mới"
            onChange={(e) => setValueTextArea(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label
            htmlFor="dateTime"
            style={{ backgroundColor: "orange", color: "black" }}
          >
            Deadline
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="dateTime"
            value={valueTime}
            onChange={(e) => {
              setValueTime(e.target.value);
            }}
          />
        </div>
        {!isShowUpdate ? (
          <button
            type="submit"
            className="btn btn-primary mt-4"
            style={{ display: "flex" }}
          >
            <AddCircle style={{ marginRight: "6px" }} />
            Thêm công việc
          </button>
        ) : (
          ""
        )}
        {isShowUpdate ? (
          <button
            type="button"
            className="btn btn-primary mt-4"
            style={{ display: "flex" }}
            onClick={() => handleUpdateTask()}
          >
            <AddCircle style={{ marginRight: "6px" }} />
            Cập nhật
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default TodoTask;
