import React, { useEffect, useState } from "react";
import s from "./todosearch.module.css";
import {
  AlignLeft,
  ArchiveTick,
  ArrowDown2,
  Edit,
  Star1,
  Task,
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { convertDateFormat, fixTime } from "../../utilities";
import { TTaskProps } from "../types";
import {
  completedTaskAction,
  doneAllTask,
  editTaskAction,
  getAllTask,
  importantTaskAction,
  sortByDeadline,
  sortByImportant,
} from "../../redux/action";
import { TTodoTaskProps } from "../TodoTask/TodoTask";
import axios from "axios";
import Swal from "sweetalert2";

export const ListTask = ({
  listTask,
  isRender,
  setRender,
  isShowUpdate,
  setShowUpdate,
}) => {
  const userData = useSelector((store) => store.saveAccount);
  const dispatch = useDispatch();

  const handleDoneTask = (task) => {
    const url = `http://localhost:8080/tasks/changeCompleted/${task.id}`;
    axios
      .put(url)
      .then((response) => {
        if (response.data.toLowerCase() === "success") {
          Swal.fire({
            title: "Chúc mừng bạn đã hoàn thành công việc này!!!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
          setRender(!isRender);
        }
      })
      .catch((err) => alert(err.message));
  };

  const handleImportant = (task) => {
    const url = `http://localhost:8080/tasks/changeImportant/${task.id}`;
    axios.put(url).then((response) => {
      if (response.data === "Success") {
        setRender(!isRender);
      } else {
        Swal.fire({
          title: "Thay đổi trạng thái thất bại",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleUpdateTask = (task: TTaskProps) => {
    setShowUpdate(true);
    dispatch(editTaskAction(task));
  };

  return (
    <div>
      {listTask.map((task: TTaskProps, index) => {
        if (task.isCompleted == false) {
          return (
            <div
              className=" border-1 border-black border p-3 pt-2 mb-3"
              key={index}
            >
              <div className="heading d-flex align-items-center text-start">
                <span className="me-3">{`Ngày thêm công việc: ${convertDateFormat(
                  fixTime(task.taskInit).date
                )} --- ${fixTime(task.taskInit).time}`}</span>
                <div
                  className=""
                  onClick={() => handleImportant(task)}
                  style={{ cursor: "pointer" }}
                >
                  <Star1
                    size="22"
                    color="#FF8A65"
                    variant={task.isImportant ? "Bold" : "Linear"}
                  />
                </div>
              </div>
              <div className="body d-flex justify-content-between">
                <div className="body-left">
                  <p className="py-2">
                    <span className="fw-bold fs-5">Công việc: </span>
                    {task.taskName}
                  </p>
                  <p className="text-danger fw-bold">
                    Deadline:{" "}
                    {`${fixTime(task.taskTime).time}'/${convertDateFormat(
                      fixTime(task.taskTime).date
                    )}  `}
                  </p>
                </div>
                <div
                  className="body-right d-flex flex-column justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  <div className="" onClick={() => handleUpdateTask(task)}>
                    <Edit size="26" color="#FF8A65" />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => handleDoneTask(task)}
                    style={{ cursor: "pointer" }}
                  >
                    <ArchiveTick size="26" color="#FF8A65" />
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

const ToDoSearch = ({
  listTask,
  setListTask,
  isRender,
  setRender,
  isShowUpdate,
  setShowUpdate,
}) => {
  const [isShow, setIsShow] = useState(false);
  const userData = useSelector((store) => store.saveAccount);
  const username = userData.username;

  const dispatch = useDispatch();
  const handleCompletedAll = () => {
    const url = `http://localhost:8080/tasks/changeCompleteAll/${username}`;
    const arr = listTask.filter((task) => task.isCompleted === false);
    if (arr.length === 0) {
      Swal.fire({
        title: "Bạn đã hoàn thành tất cả công việc rồi",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      axios.get(url).then((response) => {
        if (response.status === 200) {
          setRender(!isRender);
          Swal.fire({
            title: "Chúc mừng bạn đã hoàn thành tất cả công việc",
            icon: "success",
            // timer: 1000,
            showConfirmButton: true,
          });
        }
      });
    }
  };

  const handleSortWithImportant = () => {
    const url = `http://localhost:8080/tasks/sortWithImportant/${username}`;
    axios.get(url).then((response) => {
      setListTask(response.data);
    });
  };

  const handleSortWithDeadline = () => {
    const url = `http://localhost:8080/tasks/sortWithDeadline/${username}`;
    axios.get(url).then((response) => {
      setListTask(response.data);
    });
  };

  const handleSearch = (e) => {
    let url;
    console.log(e);
    
    if (e.target.value === "") {
      url = `http://localhost:8080/tasks/${username}`;
      axios.get(url).then((res) => setListTask(res.data));
    } else {
      url = `http://localhost:8080/tasks/search/${username}/${e.target.value}`;
      axios.post(url).then((res) => {
        setListTask(res.data);
      });
    }
  };
  const handleDefauls = () => {
    const url = `http://localhost:8080/tasks/${username}`;
    axios.get(url).then((res) => setListTask(res.data));
    setListTask(listTask);
  };

  const checkListTask = () => {
    if (listTask.length === 0) {
      return 0;
    } else {
      if (listTask.filter((task) => task.isCompleted === true).length === 0) {
        return 1;
      } else {
        return -1;
      }
    }
  };


  useEffect(() => {
    const url = `http://localhost:8080/tasks/${username}`;
    axios.get(url).then((res) => setListTask(res.data));
    dispatch(getAllTask(listTask));
  }, []);

  useEffect(() => {
    const url = `http://localhost:8080/tasks/${username}`;
    axios.get(url).then((res) => setListTask(res.data));
    dispatch(getAllTask(listTask));
  }, [isRender]);
  return (
    <>
      <div className={`${s.toDoSearch}`}>
        <div className={s.search}>
          <form>
            <div className="form-group">
              <label htmlFor="search">Tìm kiếm</label>
              <input
                type="text"
                name="search"
                id="search"
                className="form-control"
                placeholder="🔍 Tìm kiếm công việc..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e)
                }
              />
            </div>
          </form>
          <div className={s.containerBtn}>
            <button
              className="btn btn-danger mt-3 d-flex align-items-center"
              onClick={handleCompletedAll}
            >
              <Task size="18" color="white" style={{ marginRight: "4px" }} />
              Hoàn thành tất cả
            </button>
            <div>
              <div className={`${s.title} btn btn-primary mt-3`}>
                <div
                  onClick={() => setIsShow(!isShow)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 4px",
                  }}
                >
                  <AlignLeft
                    size="20"
                    color="white"
                    style={{ marginRight: "6px" }}
                  />
                  Sắp xếp theo{" "}
                  <ArrowDown2
                    size="16"
                    color="white"
                    style={{ marginLeft: "6px" }}
                  />
                </div>
                {isShow ? (
                  <ul>
                    <li onClick={handleSortWithDeadline}>Hạn hoàn thành</li>
                    <li onClick={handleSortWithImportant}>Quan trọng </li>
                    <li onClick={handleDefauls}>Mặc định </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={s.allTask}>
          <div className={s.emty}>
            {checkListTask() === 0 ? (
              <div className={s.emty}>
                Không có công việc nào cần hoàn thành !!!
              </div>
            ) : (
              <div className={s.emty}>
                <ListTask
                  listTask={listTask}
                  isRender={isRender}
                  setRender={setRender}
                  isShowUpdate={isShowUpdate}
                  setShowUpdate={setShowUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoSearch;
