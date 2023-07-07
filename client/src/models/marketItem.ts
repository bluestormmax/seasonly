export interface MarketItem {
  _id: string;
  name: string;
  displayName: string;
  zones: [
    {
      zone: string;
      dates: {
        plant: string[];
        harvest: string[];
      };
    }
  ];
}
