import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Clock from "../Clock";
import Content from "../Content";
import InforUser from "components/InforUser/InforUser";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAction, getAllTask } from "redux/action";
import axios from "axios";

function PageLogin() {
  return (
    <>
      <Clock />
      <Content />
    </>
  );
}

export default PageLogin;
