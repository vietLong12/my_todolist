import { TTaskProps } from "../components/types";

export function convertDateFormat(inputDate: string) {
  // Tách chuỗi ngày thành mảng gồm năm, tháng, và ngày
  const parts = inputDate.split("-");

  // Sắp xếp lại mảng để có thứ tự dd-mm-yyyy
  const outputDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  return outputDate;
}

export const fixTime = (t: string) => {
  if (t == undefined) {
    return {
      date: "",
      time: "",
    };
  }
  return {
    date: t.slice(0, 10),
    time: t.slice(11, t.length),
  };
};

export const timeDefaults = () => {
  const d = new Date();
  return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(
    "0" + d.getDate()
  ).slice(-2)}T${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(
    -2
  )}`;
};

export function generateRandomId(length: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
export function sortByDate(arr: TTaskProps[]) {
  arr.sort(
    (a: TTaskProps, b: TTaskProps) =>
      new Date(a.taskTime).getTime() - new Date(b.taskTime).getTime()
  );
  return arr;
}
