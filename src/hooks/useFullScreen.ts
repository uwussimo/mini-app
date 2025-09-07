import { requestFullscreen, useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

export const useFullScreen = () => {
  //is fullscreen is true, request fullscreen on mobile only
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lp = useLaunchParams();

  useEffect(() => {
    const enterFullscreen = async () => {
      if (!isFullscreen) {
        try {
          await requestFullscreen();
          setIsFullscreen(true);
        } catch (error) {
          if (
            error instanceof Error &&
            error.message.includes("already being requested")
          ) {
            // Ignore concurrent call errors
            return;
          }
          console.error("Failed to enter fullscreen:", error);
        }
      }
    };
    if (lp.tgWebAppPlatform === "ios" || lp.tgWebAppPlatform === "android") {
      enterFullscreen();
    }
  }, [isFullscreen]);

  return isFullscreen;
};
