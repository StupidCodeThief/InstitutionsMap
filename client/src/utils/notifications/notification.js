import { notification } from "antd";
import { Toast } from "antd-mobile";

const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
  navigator.userAgent
);

export const showNotification = (message, type) => {
  if (isMobile) {
    switch (type) {
      case "success":
        Toast.success(`${message}`, 2);
        break;
      case "fail":
        Toast.fail(`${message}`, 2);
        break;
      case "info":
        Toast.info(`${message}`, 2);
        break;
      case "loading":
        Toast.loading(`${message}`, 2);
        break;
      case "offline":
        Toast.offline(`${message}`, 2);
        break;
      default:
        break;
    }
  } else {
    switch (type) {
      case "success":
        notification.success({ message });
        break;
      case "error":
        notification.error({ message });
        break;
      case "info":
        notification.info({ message });
        break;
      case "warning":
        notification.warning({ message });
        break;
      default:
        break;
    }
  }
};
