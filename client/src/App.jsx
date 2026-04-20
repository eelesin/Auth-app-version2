import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = ()=> {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute><Profile /></PrivateRoute>
          }
          />
      </Routes>
    </AuthProvider>
    </BrowserRouter>

  )
}
export default App;