import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SearchBox from "../components/search-box";
import Pagination from "../components/pagination";
import { PAGE_LIMIT } from "../utils/constants";
import { useAnime } from "../api";
import { Anime } from "../types/anime";
import { useNavigate } from "react-router";
import json from "../utils/anime_dummy.json";
import "../assets/css/pagination.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/index.css";
// import { fetchAnimeList } from "../api/services/anime";

export default function Home() {
  // States
  const [page, setPage] = useState<number>(1);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_LIMIT);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [dummyAnimeList] = useState<Anime[]>(json);
  const [searchValue, setSearchValue] = useState<string>();
  let timeout: any;

  // Hooks
  const navigate = useNavigate();
  const { data, isLoading } = useAnime(page, pageSize, searchValue ?? "");

  useEffect(() => {
    if (data?.data) {
      setAnimeList(data?.data);
    }

    if (data?.pagination) {
      const pgTotal = Math.ceil(
        data?.pagination?.items.total / data?.pagination?.items.per_page
      );
      setTotalPage(pgTotal);
      setTotalRecord(data?.pagination?.items.total);
      setPageSize(data?.pagination?.items.per_page);
    }
  }, [data]);

  const onPageChanged = (pageNo: number) => {
    if (pageNo != 0 && pageNo <= totalPage) {
      setPage(pageNo);
    }
  };

  const onPageSizeChanged = (size?: number) => {
    if (size) {
      setPageSize(size);
    }
  };

  // var throttle = function (func: () => void, delay: number) {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(func, delay);
  // };

  const onSearchInput = (value: string) => {
    setSearchValue(value);
    // throttle(async () => {
    //   const data = await fetchAnimeList(page, pageSize, value);

    //   if (data?.data) {
    //     setAnimeList(data?.data);
    //   }

    //   if (data?.pagination) {
    //     const pgTotal = Math.ceil(
    //       data?.pagination?.items.total / data?.pagination?.items.per_page
    //     );
    //     setTotalPage(pgTotal);
    //     setTotalRecord(data?.pagination?.items.total);
    //     setPageSize(data?.pagination?.items.per_page);
    //   }
    //   setSearchValue(value);
    // }, 1000);
  };

  return (
    <div className="w-full flex-col flex p-4">
      <div className="flex justify-end">
        <SearchBox onSearch={onSearchInput} />
      </div>
      <div className="mt-4">
        {((animeList && animeList?.length > 0) || dummyAnimeList) && (
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
            {isLoading
              ? dummyAnimeList.map((elem) => {
                  return (
                    <SkeletonTheme
                      baseColor="#ebf6f4"
                      highlightColor="white"
                      key={elem.mal_id}
                    >
                      <p>
                        <Skeleton count={3} />
                      </p>
                    </SkeletonTheme>
                  );
                })
              : animeList.map((anime) => {
                  return (
                    <div
                      className="cursor-pointer"
                      key={anime?.mal_id}
                      onClick={() => {
                        navigate(`anime/${anime.mal_id}`);
                      }}
                    >
                      {anime?.images.jpg && (
                        <img
                          src={anime?.images.jpg.image_url}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  );
                })}
          </div>
        )}
      </div>
      <div className="mt-4">
        <Pagination
          className="pagination-bar"
          currentPage={page}
          totalCount={totalRecord}
          pageSize={pageSize}
          onPageChange={(page) => onPageChanged(page)}
          onPageSizeChange={(pageSize) => onPageSizeChanged(pageSize)}
          siblingCount={2}
        />
      </div>
    </div>
  );
}
