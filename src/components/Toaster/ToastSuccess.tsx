import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastSuccessProps = {
  message: string;
  position: ToastPosition;
}

const ToastSuccess: React.FC<ToastSuccessProps> = ({ message, position }) => {

  const toastOptions: ToastOptions = {
    position: position as ToastPosition,
    autoClose: 8000, 
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  toast.success(message, toastOptions);

  return null; 
};

export default ToastSuccess;