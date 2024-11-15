import { Home, SignIn, SignUp } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Login",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Cadastrar",
    path: "/sign-up",
    element: <SignUp />,
  }
];

export default routes;
