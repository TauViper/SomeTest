import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ChatList } from "./pages/ChatList";
import { Chats } from "./pages/Chats";
import { Profile } from "./pages/Profile";
import React, { FC, useEffect } from "react";
import { Header } from "./Header/Header";
import { Articles } from "./pages/Articles";
import { PrivateRoute } from "./Header/PrivateRoute";
import { PublicRoute } from "./Header/PublicRoute";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { changeAuth } from "src/store/profile/slice";
import { auth } from "src/services/firebase";
import { initialMessagesFB } from "src/store/chats/slice";
import { ChatState } from "src/store/chats/slice";

export const AppRouter: FC = () => {
  const dispatch = useDispatch<ThunkDispatch<ChatState, void, any>>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(changeAuth(true));
      } else {
        dispatch(changeAuth(false));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(initialMessagesFB());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/Articles" element={<Articles />} />

          <Route
            path="*"
            element={
              <div className="ErrorPage">
                <h2>Page not found.</h2>
                <h4 className="ErrorPage__message">
                  Our apologies, this is almost certainly not the page you were
                  looking for.
                </h4>
                <h4 className="ErrorPage__secondaryMessage">
                  Please try the search tool, above, or visit our{" "}
                  <Link to="/">Home Page</Link>.
                </h4>
                <a className="Link" href="/"></a>
              </div>
            }
          />
        </Route>

        <Route path="/Chats">
          <Route
            index
            element={
              <PrivateRoute>
                <ChatList />
              </PrivateRoute>
            }
          />

          <Route
            path=":chatId"
            element={
              <PrivateRoute>
                <Chats />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
