import { MarketItem } from "@models/marketItem";
import { fetchData } from "./fetchData.api";

export async function fetchAllMarketItems(): Promise<MarketItem[]> {
  const response = await fetchData("/api/marketItems", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response.json();
}
