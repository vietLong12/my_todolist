import React, { useState } from "react";
import s from "./content.module.css";
import ToDoSearch from "../ToDoSearch/ToDoSearch";
import TodoTask from "../TodoTask/TodoTask";
import ToDoDone from "../ToDoDone/ToDoDone";
import { useSelector } from "react-redux";
import InforUser from "components/InforUser/InforUser";

const Content: React.FC = () => {
  const [isRender, setRender] = useState(false);
  const [listTask, setListTask] = useState([]);
  const [isShowUpdate, setShowUpdate] = useState(false);
  return (
    <div className="container mt-lg-5 position-relative">
        <InforUser />
      <div className="row">
        <div className="col">
          <ToDoSearch isRender={isRender} setRender={setRender} listTask={listTask} setListTask={setListTask} isShowUpdate={isShowUpdate} setShowUpdate={setShowUpdate} />
        </div>
        <div className="col">
          <TodoTask isRender={isRender} setRender={setRender} isShowUpdate={isShowUpdate} setShowUpdate={setShowUpdate} listTask={listTask} setListTask={setListTask} />
          <ToDoDone isRender={isRender} setRender={setRender} listTask={listTask} setListTask={setListTask} />
        </div>
      </div>
    </div>
  );
};

export default Content;
