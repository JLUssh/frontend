import TopBar from "@comp/TopBar";
import Homepage, { loader as homeLoader } from "@pag/Homepage";
import SinglePage from "@pag/SinglePage";
import LoginPage from "@pag/LoginPage";
import RegisterPage from "@pag/RegisterPage";
import Settings from "@pag/Settings";
import Write from "@pag/Write";
import ImageAll from "@pag/ImageAll";
import ErrorPage from "@pag/ErrorPage";
import Concat from "@pag/Concat";
// import React, { useEffect } from "react";
import React, { useEffect } from "react";

import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { withScrollTop } from "./hoc";

import { ContextProvider } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";

// const NewHomePage = withScrollTop(Homepage);

const ContextLayout = () => (
  <ContextProvider>
    <TopBar />
    <Outlet />
  </ContextProvider>
);

//有一个这样的路由配置文件
const router = createBrowserRouter([
  {
    // path: "/",
    element: <ContextLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: homeLoader,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "write",
        element: (
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>
        ),
      },
      {
        path: "concat",
        element: <Concat />,
      },
      {
        path: "aboutMe",
        element: <Concat />,
      },
      {
        path: "post/:postId",
        element: <SinglePage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <div className="App w-full h-full relative">
      {/* React.Fragment */}
      <>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
        {/* <Home /> */}
      </>
    </div>
  );
};

export default App;
