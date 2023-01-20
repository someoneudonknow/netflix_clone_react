import "./App.scss";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loading } from "../components/UI";
import { LoginForm, RegisterForm } from "../components/Forms";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const WelcomePage = lazy(() => import("./Welcome"));
const HomePage = lazy(() => import("./Home"));
const LoginSignUpPage = lazy(() => import("./Login_SignUp"));
const WatchPage = lazy(() => import("./WatchPage"));
const TVShowsPage = lazy(() => import("./TVShows"));
const TrendingPage = lazy(() => import("./TrendingPage"));
const MyListPage = lazy(() => import("./MyListPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/vn" />} />
        <Route path="/vn" element={<WelcomePage />} />
        <Route path="/vn/login_register" element={<LoginSignUpPage />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route
          path="/vn/home/:userId"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/vn/TVShow"
          element={
            <PrivateRoute>
              <TVShowsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/vn/watch"
          element={
            <PrivateRoute>
              <WatchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/vn/trending"
          element={
            <PrivateRoute>
              <TrendingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/vn/myList"
          element={
            <PrivateRoute>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate replace to="/vn" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
