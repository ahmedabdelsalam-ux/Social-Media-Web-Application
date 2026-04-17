export interface FrindesData {}

export interface FrindesDataRespons {
  success: boolean;
  message: string;
  data: FrindesData;
  meta: Meta;
}

export interface FrindesData {
  suggestions: Suggestion[];
}

export interface Suggestion {
  _id: string;
  name: string;
  username?: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
  isFollowing?: boolean;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
  nextPage: number;
}
