import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { useNotificationStore } from "../lib/notificationStore";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // setSocket(io("http://localhost:4000"));
    // setSocket(io("https://realestate-react-js-sock.onrender.com"));
    const newSocket = io("http://localhost:4000");
    
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser, socket]);

  // Global notification listener
  useEffect(() => {
    if (socket && currentUser) {
      const handleNotification = (data) => {
        // Use Zustand store to increase notification count
        const { increase } = useNotificationStore.getState();
        increase();
      };

      socket.on("getNotification", handleNotification);

      return () => {
        socket.off("getNotification", handleNotification);
      };
    }
  }, [socket, currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
