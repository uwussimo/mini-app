"use client";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";
import {
  Cell,
  List,
  Section,
  Banner,
  Image,
  Button,
  Text,
} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";
import { Link } from "@/components/Link/Link";
import { initData } from "@telegram-apps/sdk-react";
import { useSignal } from "@telegram-apps/sdk-react";

const Profile = () => {
  const t = useTranslations("i18n");
  const user = useSignal(initData.user);
  return (
    <Page>
      <List>
        <Banner
          before={
            <Image
              size={48}
              src={user?.photo_url || ""}
              style={{ backgroundColor: "var(--tg-theme-button-color)" }}
              alt={user?.first_name + " " + user?.last_name}
            />
          }
          description={"@" + user?.username}
          header={user?.first_name + " " + user?.last_name}
          subheader={user?.id.toString()}
          type="section"
        />
        <Section header={t("header")} footer={t("footer")}>
          <LocaleSwitcher />
        </Section>
        {
          //if dev show this section
          process.env.NODE_ENV === "development" && (
            <Section
              header="Application Launch Data"
              footer="These pages help developer to learn more about current launch information"
            >
              <Link href="/init-data">
                <Cell subtitle="User data, chat information, technical data">
                  Init Data
                </Cell>
              </Link>
              <Link href="/launch-params">
                <Cell subtitle="Platform identifier, Mini Apps version, etc.">
                  Launch Parameters
                </Cell>
              </Link>
              <Link href="/theme-params">
                <Cell subtitle="Telegram application palette information">
                  Theme Parameters
                </Cell>
              </Link>
            </Section>
          )
        }
      </List>
    </Page>
  );
};

export default Profile;
