import { useEffect } from "react";
import { App } from "@capacitor/app";
import { useHistory } from "react-router-dom";

const AppExitHandler = () => {
  const history = useHistory();

  useEffect(() => {
    const backButtonListener = App.addListener("backButton", () => {
      if (history.length > 1) {
        history.goBack(); // Navigate back if possible
      } else {
        App.exitApp(); // Exit the app if no previous view
      }
    });

    return () => {
      backButtonListener.then(listener => listener.remove()); // Cleanup listener on unmount
    };
  }, [history]);

  return null;
};

export default AppExitHandler;
