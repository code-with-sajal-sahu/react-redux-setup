import "./App.css";
import { Toaster } from "sonner";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setupInterceptors } from "./config/DataService";
import { useAppDispatch } from "./redux/hooks";
import AllRoutes from "./routes/AllRoutes";

function AppWrapper() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setupInterceptors(navigate, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster closeButton position="top-right" richColors theme="system" />
      <AllRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
