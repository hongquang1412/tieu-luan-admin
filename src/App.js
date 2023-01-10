import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./components/layout/DefaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { publicRoutes, privateRoutes } from "./routes/index";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>

        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
