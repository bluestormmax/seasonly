import { MarketItemModel } from "@models/marketItem";
import { fetchData } from "./fetchData.api";

export async function fetchAllMarketItems(): Promise<MarketItemModel[]> {
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
): Promise<MarketItemModel[]> {
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

export interface SelectedMarketItems {
  items: string[];
}

export async function fetchSelectedMarketItems(
  items: SelectedMarketItems
): Promise<MarketItemModel[]> {
  const itemsArr = items.items;
  const queryString = "?items=" + itemsArr.join(",");

  const response = await fetchData(`/api/marketItems/selected${queryString}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response.json();
}
