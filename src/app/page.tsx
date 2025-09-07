"use client";

import {
  Section,
  Cell,
  Image,
  List,
  Button,
  Text,
} from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page";
import { useFullScreen } from "@/hooks/useFullScreen";
import { useEffect, useState } from "react";
import { Brand } from "./api/brands/route";
import { Link } from "@/components/Link/Link";

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  useFullScreen();

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.brands));
  }, []);

  return (
    <Page back={false}>
      <List>
        {brands.length > 0 ? (
          <Section header="Brendlar">
            {brands.map((brand) => (
              <Link href={`/brand/${brand.id}`} key={brand.id}>
                <Cell
                  before={
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        backgroundColor: "var(--tg-theme-button-color)",
                      }}
                    />
                  }
                  subtitle={brand.description}
                >
                  {brand.name}
                </Cell>
              </Link>
            ))}
          </Section>
        ) : (
          <div className="root__loading">
            <Text className="animate-pulse">Brendlar yuklanmoqda...</Text>
          </div>
        )}
      </List>
    </Page>
  );
}
