import { Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import Home from "./Home";
import Login from "./component/Login";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { setSocket } from "../redux/socketSlice";
import { setOnlineUsers } from "../redux/userSlice";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser?._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
