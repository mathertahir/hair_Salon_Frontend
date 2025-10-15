import { ToastService } from "../ToastService";

export const handleApiError = (error) => {
  const messages = error.response?.data?.responseMessage;

  if (Array.isArray(messages)) {
    messages.forEach((message) => {
      ToastService.error(message);
    });
  } else if (messages) {
    ToastService.error(messages);
  } else {
    ToastService.error("An unexpected error occurred.");
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
