import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { anime } from "./services";
import { ResponseAnimeDetail } from "../types/response";

export const useAnime = (page: number, limit: number, searchValue: string) => {
  return useQuery({
    queryKey: [`search_anime`, page, limit, searchValue],
    queryFn: () => anime.fetchAnimeList(page, limit, searchValue),
    staleTime: 60 * 60 * 1000, // Data is fresh for 1 hour
    gcTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });
};

export const useAnimeById = (id?: string) => {
  return useQuery({
    queryKey: [`get_anime_by_id`, id],
    queryFn: () => anime.getAnimeById(id),
    staleTime: 60 * 60 * 1000, // Data is fresh for 1 hour
    gcTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    enabled: id != null && id != undefined && id != "",
    select: useCallback((data: ResponseAnimeDetail) => data.data, []),
  });

  // return {
  //   ...queryInfo,
  //   data: useMemo(() => queryInfo.data, [queryInfo.data]), // memoizes by queryInfo.data
  // };
};
