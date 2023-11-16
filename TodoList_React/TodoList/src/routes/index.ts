import PageLogin from "../components/PageLogin";
import PageTrial from "../components/PageTrial";

export const privateRouter = [
  {
    path: "/login",
    element: PageLogin,
  },
];
export const publicRouter = [
  {
    path: "/",
    element: PageTrial,
  }
];
