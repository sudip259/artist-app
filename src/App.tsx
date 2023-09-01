import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
// import "antd/dist/antd.css";
import routes from "./routes";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.path === "/login" || route.path === "/" ? (
                    route.element
                  ) : (
                    <PrivateRoute>{route.element}</PrivateRoute>
                  )
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
