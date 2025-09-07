"use client";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Text } from "@telegram-apps/telegram-ui";

const TopBar = () => {
  // get platform from launch params
  const lp = useLaunchParams();

  return lp.tgWebAppPlatform === "tdesktop" ||
    lp.tgWebAppPlatform === "macos" ? null : (
    <div
      style={{
        height: "64px",
        width: "100%",
        backgroundColor: "var(--tg-theme-bg-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        borderBottom: "1px solid var(--tg-theme-section-separator-color)",
        marginBottom: "10px",
      }}
    >
      <Text>Promo Bor Bot</Text>
    </div>
  );
};

export default TopBar;
