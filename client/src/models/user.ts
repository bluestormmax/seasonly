export interface User {
  _id: string;
  username: string;
  email: string;
  state: string;
  zone: {
    zone: string;
    coordinates: {
      lat: string;
      lon: string;
    };
    temperature_data: string;
  };
}
