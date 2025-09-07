"use client";
import { Brand } from "@/app/api/brands/route";
import { Page } from "@/components/Page";
import {
  Banner,
  Button,
  Cell,
  Image,
  List,
  Section,
  Text,
  Snackbar,
  Badge,
  Accordion,
  Blockquote,
} from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { Clipboard, ClipboardCheck, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BrandPage = ({ params }: PageProps) => {
  const { id } = use(params);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [copied, setCopied] = useState(false);

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    fetch(`/api/brands?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBrand(data));
  }, [id]);

  return (
    <Page back={true}>
      {brand ? (
        <List>
          <Banner
            before={
              <Image
                size={48}
                src={brand?.logo}
                style={{ backgroundColor: "var(--tg-theme-button-color)" }}
              />
            }
            description={brand?.description}
            header={brand?.name}
            type="section"
          >
            <Button
              size="s"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Havola orqali chegirma <ExternalLink size={16} />{" "}
            </Button>
          </Banner>
          <Section
            header="Promo kod"
            footer={"Promo kod ustiga bosib promo kodni kochirib oling."}
          >
            {brand?.promo_codes.map((promo_code) => (
              <>
                <Cell
                  after={
                    <Badge type="number">
                      {promo_code.discount_percentage}
                    </Badge>
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(promo_code.code);
                    setSnackbar(true);
                    setCopied(true);
                  }}
                >
                  <Text caps={true}>{promo_code.code}</Text>
                </Cell>
                <AccordionPromoCode promo_code={promo_code} />
              </>
            ))}
          </Section>
        </List>
      ) : (
        <div className="root__loading">
          <Text className="animate-pulse">Brend yuklanmoqda...</Text>
        </div>
      )}
      {snackbar && (
        <Snackbar
          duration={3000}
          onClose={() => setSnackbar(false)}
          description={"Endi undan foydalanishingiz mumkin"}
          before={
            <ClipboardCheck
              size={20}
              style={{ color: "var(--tg-theme-link-color)" }}
            />
          }
        >
          <Text>Promo kod ko&apos;chirildi</Text>
        </Snackbar>
      )}
    </Page>
  );
};

interface PromoCode {
  code: string;
  discount_desc: string;
  discount_percentage: string;
  discount_amount: string;
  expires_at: string;
  link: string;
}

const AccordionPromoCode = ({ promo_code }: { promo_code: PromoCode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary>Ko&apos;proq ma&apos;lumot</AccordionSummary>
      <AccordionContent>
        <div
          style={{
            padding: "10px 20px 20px",
          }}
        >
          <Blockquote>{promo_code.discount_desc}</Blockquote>
        </div>
      </AccordionContent>
    </Accordion>
  );
};

export default BrandPage;
