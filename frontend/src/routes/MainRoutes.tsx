import React, { lazy, Suspense } from "react";
import Loader from "components/Loader";
import MainLayout from "../layout/MainLayout";
// import AuthGuard from "utils/authguard";

const HomePage = lazy(() => import("../views/Pages/Home"));
const ErrorPage = lazy(() => import("../views/Error"));

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
    },
  ],
};

export default MainRoutes;
