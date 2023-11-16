import React, { useEffect, useState } from "react";
import s from "../Clock/clock.module.css";
import InforUser from "components/InforUser/InforUser";

interface TClockProps {}

const Clock: React.FC<TClockProps> = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);
  const hour = ("0" + time.getHours().toString()).slice(-2);

  const minute = ("0" + time.getMinutes().toString()).slice(-2);

  const second = ("0" + time.getSeconds().toString()).slice(-2);

  function convertDayToOrdinal(day: number) {
    const ordinals = [
      "",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
      "Chủ nhật",
    ];
    if (day >= 1 && day <= 7) {
      return ordinals[day];
    } else {
      return "Không hợp lệ";
    }
  }

  const day: string = convertDayToOrdinal(time.getDay());
  const fullDate = (d: number, m: number, y: number) => {
    const newD = ("0" + d.toString()).slice(-2);
    const newM = ("0" + (m + 1).toString()).slice(-2);
    return `${newD}/${newM}/${y}`;
  };

  const fullDateS = fullDate(
    time.getDate(),
    time.getMonth(),
    time.getFullYear()
  );
  return (
    <>
      
      <div className={s.clock}>
        {`${hour}:${minute}:${second} - ${day}, ${fullDateS}`}
      </div>
    </>
  );
};

export default Clock;
