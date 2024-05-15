import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import View from "./pages/View";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path={"/"} />
          <Route element={<View />} path={"view"} />
          <Route element={<Create />} path={"create"} />
          <Route element={<Home />} index path={"/home"} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
