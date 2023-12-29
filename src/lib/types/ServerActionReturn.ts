// if you don't specify the generic arguments you can use
// `{ error: true }` for when there's an error and `{ data: true }`
// for when there's no error
type ServerActionReturn<Data = true, Err = true> =
  | ServerActionReturnData<Data>
  | ServerActionReturnError<Err>;

type ServerActionReturnData<T> = {
  error?: null | undefined;
  data: T;
};

type ServerActionReturnError<T> = {
  error: T;
  data?: null | undefined;
};

export default ServerActionReturn;
