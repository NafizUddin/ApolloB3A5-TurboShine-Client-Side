export type TErrorSources = {
  path: string | number;
  message: string;
}[];

// type for return value of handle error functions
export type TErrorResponse = {
  statusCode: number;
  data: {
    success: boolean;
    message: string;
    errorSources: TErrorSources;
  };
};
