export interface MarketItem {
  _id: string;
  name: string;
  displayName: string;
  zones: [
    {
      zone: string;
      planting_dates: string[];
      harvest_dates: string[];
    }
  ];
}
