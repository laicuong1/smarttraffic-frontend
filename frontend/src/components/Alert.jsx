import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alert() {
  useEffect(() => {
    setTimeout(() => {
      toast.warning("Traffic Jam Detected!");
    }, 3000);
  }, []);

  return <ToastContainer />;
}

export default Alert;