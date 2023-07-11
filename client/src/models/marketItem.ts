export interface MarketItemModel {
  _id: string;
  name: string;
  displayName: string;
  imageUrl: string;
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
