export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  trailer: object;
  approved: boolean;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: object[];
  aired: object;
  rating: string;
  score?: number;
  scored_by?: number;
  members?: number;
  favorites?: number;
  season: string;
  licensors: object[];
  studios: object[];
  genres: { mal_id: number; type: string; url: string; name: string }[];
  themes?: object[];
  demographics?: object[];
  titles: {
    type: string;
    title: string;
  }[];
  airing: boolean;
  producers: object[];
  explicit_genres: object[];
  type?: string;
  source?: string;
  episodes?: number;
  status?: string;
  duration?: string;
  rank?: number;
  popularity?: number;
  synopsis?: string;
  background?: string;
  year?: number;
  broadcast?: object;
};
