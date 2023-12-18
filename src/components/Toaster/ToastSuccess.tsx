import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastSuccessProps = {
  message: string;
}

const ToastSuccess: React.FC<ToastSuccessProps> = ({ message }) => {

  const toastOptions: ToastOptions = {
    position: "bottom-center",
    autoClose: 8000, // Close the toast after 3 seconds
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  toast.success(message, toastOptions);

  return null; 
};

export default ToastSuccess;