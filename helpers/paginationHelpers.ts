import { SortOrder } from "mongoose";
import { IPaginationTypes } from "../interfaces/pagination.types";

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IPaginationTypes): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit);
  const sortBy = options.sortBy || "quantity";
  const sortOrder = options.sortOrder || "desc";

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};

export const paginationHelpers = { calculatePagination };
