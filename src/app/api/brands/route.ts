// respond with brands.json
import brands from "./brands.json" assert { type: "json" };

export type Brand = (typeof brands.brands)[number];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const brand = brands.brands.find((brand) => brand.id === id);

  if (id === null) {
    return Response.json(brands);
  }

  if (!brand) {
    return Response.json({ error: "Brand not found" }, { status: 404 });
  }
  return Response.json(brand);
}
