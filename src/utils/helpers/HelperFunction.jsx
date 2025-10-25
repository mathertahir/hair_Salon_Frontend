import { ToastService } from "../ToastService";

export const handleApiError = (error) => {

  console.log(error, "Comming Error")
  const messages = error.response?.data?.responseMessage;
  console.log(messages, "Comming Message")

  if (Array.isArray(messages)) {
    messages.forEach((message) => {
      ToastService.error(`${message}`);
    });
  } else if (messages) {
    ToastService.error(messages);
  } else {
    ToastService.error("An unexpected error occurred.");
  }
};

export const formatDate = (dateString) => {
  console.log("commingDate", dateString);
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const monthName = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${monthName}-${year}`;
};

