import { useIonRouter } from "@ionic/react";
import { App } from "@capacitor/app";

const AppExitHandler: React.FC = () => {
  const ionRouter = useIonRouter();
  document.addEventListener("ionBackButton", (event) => {
    event.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  return null;
};

export default AppExitHandler;
