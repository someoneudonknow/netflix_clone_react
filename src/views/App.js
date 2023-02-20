import "./App.scss";
import { lazy, Suspense, useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Loading } from "../components/UI";
import { LoginForm, RegisterForm } from "../components/Forms";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { AuthContext } from "../store/Auth/AuthProvider";
import { getWishList, updateList } from "../store/wishListActions";
import { getGenresList } from "../store/movieActions";
import { MainLayout } from "../components/layout";
import { MovieModal, TVShowModal } from "../components/Modal";

const SearchPage = lazy(() => import("./SearchPage"));
const WelcomePage = lazy(() => import("./Welcome"));
const HomePage = lazy(() => import("./Home"));
const LoginSignUpPage = lazy(() => import("./Login_SignUp"));
const WatchPage = lazy(() => import("./WatchPage"));
const TVShowsPage = lazy(() => import("./TVShows"));
const TrendingPage = lazy(() => import("./TrendingPage"));
const MyListPage = lazy(() => import("./MyListPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));

//TODO: fuckkkkkkkk this shit
//TODO: fix modal saving state

function App() {
  const [show, setShow] = useState(false);
  const [currentModal, setCurrentModal] = useState();
  const wishList = useSelector((state) => state.wishList.currentUserWishList);
  const modalList = useSelector((state) => state.modals.currentModals);
  const isChanged = useSelector((state) => state.wishList.changed);
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalList.length > 0) {
      setCurrentModal(modalList[modalList.length - 1]);
      setShow(true);
    } else {
      setCurrentModal(null);
    }
  }, [modalList, dispatch]);

  const handleHideModal = () => {
    setShow(false);
  };

  useEffect(() => {
    if (isChanged) {
      dispatch(updateList(wishList, ctx.currentUser.uid));
    }
  }, [wishList, isChanged]);

  useEffect(() => {
    dispatch(getGenresList());
  }, []);

  useEffect(() => {
    if (ctx?.currentUser?.uid) {
      dispatch(getWishList(ctx.currentUser.uid));
    }
  }, [ctx, ctx?.currentUser?.uid]);

  return (
    <>
      {currentModal && currentModal.type === "movie" && (
        <MovieModal
          id={currentModal.id}
          isShow={show}
          onHide={handleHideModal}
        />
      )}
      {currentModal && currentModal.type === "tv" && (
        <TVShowModal
          id={currentModal.id}
          isShow={show}
          onHide={handleHideModal}
        />
      )}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/vn/welcome" />} />
          <Route path="/vn/welcome" element={<WelcomePage />} />
          <Route path="/vn/login_register" element={<LoginSignUpPage />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route
            path="/vn"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="home/:userId"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="TVShow"
              element={
                <PrivateRoute>
                  <TVShowsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="trending"
              element={
                <PrivateRoute>
                  <TrendingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="myList"
              element={
                <PrivateRoute>
                  <MyListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="search"
              element={
                <PrivateRoute>
                  <SearchPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/vn/watch"
            element={
              <PrivateRoute>
                <WatchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vn/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<Navigate replace to="/vn/welcome" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;