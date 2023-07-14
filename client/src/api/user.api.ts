import { UserModel } from "@models/user";
import { fetchData } from "./fetchData.api";

// Because FE and BE are on same route, cookie gets passed to FE automatically.
export async function getLoggedInUser(): Promise<UserModel> {
  const response = await fetchData("/api/users", {
    method: "GET",
  });
  return response.json(); // If logged in, this will contain the user data. This works because FE and BE are on the same url.
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(
  credentials: SignUpCredentials
): Promise<UserModel> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<UserModel> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  // We know this works if fetchData doesn't throw.
  await fetchData("/api/users/logout", {
    method: "POST",
  });
}

export interface ZoneData {
  zone: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  temperature_range: string;
}

export interface ProfileFields {
  state?: string;
  zone?: ZoneData;
  zip?: string;
}

export async function updateUser(
  profileFields: ProfileFields,
  userId: string
): Promise<UserModel> {
  const response = await fetchData("/api/users/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileFields),
  });
  return response.json();
}

export async function fetchUserZoneData(zip: string): Promise<ZoneData> {
  const response = await fetch(`https://phzmapi.org/${zip}.json`);
  return response.json();
}
