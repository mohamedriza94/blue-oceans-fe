export type TPaginationParams = {
  page: number;
  limit: number;
};

export type TPaginationResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
