import { Anime } from "./anime";
import { Paginate } from "./pagination";

export type ResponseAnime = {
  data: Anime[];
  pagination: Paginate;
};

export type ResponseAnimeDetail = {
  data: Anime;
};
