import { Reducer } from "react";

export interface ContextStoreAction {
  type: string;
  payload: any;
}

export interface StoreInit<
  S extends { [key in string | number | symbol]: any },
  A extends ContextStoreAction
> {
  namespace: string;
  initState: S;
  reducer: Reducer<S, A>;
}
