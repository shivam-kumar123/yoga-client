import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastErrorProps = {
  message: string;
  time: number;
}

const ToastError: React.FC<ToastErrorProps> = ({ message, time }) => {

  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  toast.error(message, toastOptions);

  return null;
};

export default ToastError;
