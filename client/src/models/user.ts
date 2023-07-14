export interface UserModel {
  _id: string;
  username: string;
  email: string;
  state: string;
  zip: string;
  zone: {
    zone: string;
    coordinates: {
      lat: string;
      lon: string;
    };
    temperature_range: string;
  };
}
