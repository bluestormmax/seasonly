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

export interface SeasonalData {
  zone?: string;
  month?: string;
}

export async function fetchInSeasonMarketItems(
  data: SeasonalData
): Promise<MarketItem[]> {
  const response = await fetchData(
    `/api/marketItems/seasonal/${data.zone}/${data.month}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return response.json();
}
