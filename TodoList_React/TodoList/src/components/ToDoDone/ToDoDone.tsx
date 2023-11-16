import { TTaskProps } from "components/types";
import { CloseCircle, RefreshCircle, Trash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllTaskAction,
  deleteTaskAction,
  redoTaskAction,
} from "redux/action";
import { convertDateFormat, fixTime } from "utilities";
import s from "./todoDone.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const ToDoDone = ({ listTask, setListTask, isRender, setRender }) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.saveAccount);
  const handleDeleteAll = () => {
    const arr = listTask.filter((task) => task.isCompleted === true);
    if (arr.length === 0) {
      Swal.fire({
        title: "Không có gì để xóa",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      const url = `http://localhost:8080/tasks/deleteAll/${userData.username}`;
      axios.delete(url).then((res) => {
        if (res.status === 200) {
          setRender(!isRender);
          Swal.fire({
            title: "Xóa tất cả thành công!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      });
    }
  };

  const handleDeleleTask = (id) => {
    const url = `http://localhost:8080/tasks/delete/${id}`;
    axios.delete(url).then((res) => {
      if (res.data === "Success") {
        Swal.fire({
          title: "Xoá thành công",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        setRender(!isRender);
      } else {
        Swal.fire({
          title: "Có lỗi xảy ra",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };
  const handleAgainTask = (task) => {
    const url = `http://localhost:8080/tasks/changeCompleted/${task.id}`;
    axios
      .put(url)
      .then((response) => {
        if (response.data.toLowerCase() === "success") {
          setRender(!isRender);
        }
      })
      .catch((err) =>
        Swal.fire({
          title: err.mesagee,
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        })
      );
  };

  return (
    <div className={s.todoDone}>
      <h1 className="fs-1">Todo Done</h1>
      <button
        onClick={handleDeleteAll}
        className="btn btn-danger d-flex align-items-center mt-3 mb-3"
      >
        <Trash size="20" color="#fff" className="me-2" />
        Xoá tất cả
      </button>

      {/* Hiển thị danh sách công việc đã hoàn thành */}
      {listTask.map((task: TTaskProps, index: number) => {
        if (task.isCompleted) {
          return (
            <div
              className={` border-1 border-black border p-3 pt-2 mb-3 opacity-50 ${s.taskTodo}`}
              key={index}
            >
              <div className="heading d-flex align-items-center">
                <span className="me-3 text-decoration-line-through">{`Ngày thêm công việc: ${convertDateFormat(
                  fixTime(task.taskInit).date
                )} --- ${fixTime(task.taskInit).time}`}</span>
              </div>
              <div className="body d-flex justify-content-between">
                <div className="body-left">
                  <p className="py-2">
                    <span className="fw-bold fs-5">Công việc: </span>
                    <span className="text-decoration-line-through">
                      {task.taskName}
                    </span>
                  </p>
                  <p className="text-danger fw-bold text-decoration-line-through">
                    Deadline:{" "}
                    {`${fixTime(task.taskTime).time}'/${convertDateFormat(
                      fixTime(task.taskTime).date
                    )}  `}
                  </p>
                </div>
                <div className="body-right d-flex flex-column justify-content-center">
                  <div
                    onClick={() => handleDeleleTask(task.id)}
                    className=""
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  >
                    <CloseCircle size="30" color="red" />
                  </div>
                  <div
                    className="mt-3"
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                    onClick={() => handleAgainTask(task)}
                  >
                    <RefreshCircle size="30" color="red" />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ToDoDone;
