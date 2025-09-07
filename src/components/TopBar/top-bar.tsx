"use client";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Text } from "@telegram-apps/telegram-ui";

const TopBar = () => {
  // get platform from launch params
  const lp = useLaunchParams();

  return lp.tgWebAppPlatform === "tdesktop" ||
    lp.tgWebAppPlatform === "macos" ? null : (
    <>
      {lp.tgWebAppPlatform === "ios" && (
        <div
          style={{
            height: "50px",
            width: "100%",
            backgroundColor: "var(--tg-theme-button-color)",
          }}
        ></div>
      )}
      <div
        style={{
          width: "100%",
          backgroundColor: "var(--tg-theme-button-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding:
            lp.tgWebAppPlatform === "ios" ? "10px 10px 24px 10px" : "12px 10px",
          marginBottom: "10px",
        }}
      >
        <Text
          style={{
            color: "var(--tg-theme-button-text-color)",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Promo Bor Bot
        </Text>
      </div>
    </>
  );
};

export default TopBar;
