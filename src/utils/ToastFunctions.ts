import axios from "axios";
import { Id, toast } from "react-toastify";

export const ToastHandleAxiosCatch = (error: unknown) => {
  if (!axios.isCancel(error)) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status) {
        const { status } = error.response;

        switch (status) {
          case 500:
            CreateToast("AxiosServerError", "error", "Server error occurred.");
            return false;

          case 400:
            CreateToast("AxiosClientError", "error", "Client error occurred.");
            return false;

          case 401:
            CreateToast(
              "AxiosCredentialsError",
              "error",
              "Incorrect Email or Password!",
            );
            return false;

          default:
            CreateToast(
              "AxiosUnhandledStatus",
              "warning",
              "An unhandled status code occurred.",
            );
            return false;
        }
      } else {
        CreateToast(
          "AxiosServerDown",
          "error",
          "Failed to connect to the server.",
        );
        return true;
      }
    } else {
      CreateToast("UnknownError", "warning", "An unknown error has occurred.");
      return true;
    }
  } else {
    return false;
  }
};

export const CreateToast = (
  toastID: Id,
  type: "info" | "success" | "warning" | "error" | "default",
  message: string,
) => {
  if (!toast.isActive(toastID)) {
    switch (type) {
      case "info":
        toast.info(message, { toastId: toastID });
        break;
      case "success":
        toast.success(message, { toastId: toastID });
        break;
      case "warning":
        toast.warning(message, { toastId: toastID });
        break;
      case "error":
        toast.error(message, { toastId: toastID });
        break;
      case "default":
        toast(message, { toastId: toastID });
        break;

      default:
        toast(message, { toastId: toastID });
        break;
    }
  } else {
    toast.update(toastID, {
      autoClose: 1500,
      onClose: () => {
        toast.dismiss(toastID);
      },
    });
  }
};
