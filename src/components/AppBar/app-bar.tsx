"use client";

import "./appbar.css";
import { Avatar, InlineButtons } from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";
import { GemIcon, HomeIcon, LayoutDashboardIcon } from "lucide-react";
import { initData } from "@telegram-apps/sdk-react";
import { useSignal } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";

const AppBar = () => {
  // get user from initData
  const user = useSignal(initData.user);
  const router = useRouter();
  return (
    <InlineButtons mode="plain" className="app-bar">
      <InlineButtonsItem text="Promo" onClick={() => router.push("/")}>
        <GemIcon />
      </InlineButtonsItem>
      <InlineButtonsItem
        text={user?.first_name || "Profil"}
        onClick={() => router.push("/profile")}
      >
        <Avatar src={user?.photo_url || ""} size={24} />
      </InlineButtonsItem>
    </InlineButtons>
  );
};

export default AppBar;
