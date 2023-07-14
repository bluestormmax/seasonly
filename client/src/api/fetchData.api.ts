import {
  ConflictError,
  UnauthorizedError,
} from "@/components/errors/httpErrors";

export async function fetchData(input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json(); // We set up this JSON in our endpoint.
    const errorMsg = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMsg);
    } else if (response.status === 409) {
      throw new ConflictError(errorMsg);
    }
    throw Error(
      "Request failed with status: " + response.status + " message:" + errorMsg
    );
  }
}
