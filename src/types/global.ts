import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TResponse<T> = {
  data?: T;
  statusCode: number;
  success: boolean;
  message: string;
  averageRating?: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
