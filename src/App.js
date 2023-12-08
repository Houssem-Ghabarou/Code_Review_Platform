import "./App.css";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth?.isSuccess,
    role: auth?.user?.role,
  };

  if (!user?.isConnected) {
    return (
      <div>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
