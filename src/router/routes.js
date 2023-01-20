import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  Navigate,
  Routes,
} from "react-router-dom";
import { LoginForm, RegisterForm } from "../components/Forms";
import { lazy } from "react";

const WelcomePage = lazy(() => import("../views/Welcome"));
const HomePage = lazy(() => import("../views/Home"));
const LoginSignUpPage = lazy(() => import("../views/Login_SignUp"));

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigate replace to="/vn" />}>
      <Route index path="vn" element={<WelcomePage />} />
      <Route path="vn/login_register" element={<LoginSignUpPage />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
      <Route path="home" element={<HomePage />} />
      <Route path="*" element={<Navigate replace to="/vn" />} />
    </Route>
  )
);

export default appRouter;
