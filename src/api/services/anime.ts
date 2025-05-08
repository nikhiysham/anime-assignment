import qs from "qs";
import { ResponseAnime, ResponseAnimeDetail } from "../../types/response";

export const fetchAnimeList = async (
  page: number,
  limit: number,
  letter?: string
): Promise<ResponseAnime> => {
  const timeout = 30000; // 30 seconds timeout
  try {
    const query = qs.stringify(
      {
        page: page,
        limit: limit,
        q: letter ?? "",
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const url = `${process.env.REACT_APP_API_KEY}?${query}`;

    const fetchPromise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const timeoutPromise: Promise<never> = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );

    const response: Response = await Promise.race([
      fetchPromise,
      timeoutPromise,
    ]);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Failed to fetch anime", {
        cause: { status: response.status, ...errorData },
      });
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Please check your internet connection", {
        cause: error,
      });
    }
    throw error;
  }
};

export const getAnimeById = async (
  id?: string
): Promise<ResponseAnimeDetail> => {
  const timeout = 30000; // 30 seconds timeout
  try {
    const url = `${process.env.REACT_APP_API_KEY}/${id}`;

    const fetchPromise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const timeoutPromise: Promise<never> = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );

    const response: Response = await Promise.race([
      fetchPromise,
      timeoutPromise,
    ]);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Failed to get anime", {
        cause: { status: response.status, ...errorData },
      });
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Please check your internet connection", {
        cause: error,
      });
    }
    throw error;
  }
};
