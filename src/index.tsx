import React, {
  createContext,
  Context,
  Reducer,
  useReducer,
  ReducerState,
  ReducerAction,
  Dispatch,
  useContext,
  ReactNode,
} from "react";

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

interface ContextStoreProviderProps<
  S extends { [key in string | number | symbol]: any },
  A extends ContextStoreAction
> {
  initialState: S;
  reducer: Reducer<S, A>;
  children: React.ReactNode | React.ReactNode[];
  Provider: Context<{
    store: ReducerState<ContextStoreProviderProps<S, A>["reducer"]>;
    dispatch: Dispatch<
      ReducerAction<ContextStoreProviderProps<S, A>["reducer"]>
    >;
  }>["Provider"];
}

function ContextStoreProvider<S, T extends ContextStoreAction>({
  initialState,
  reducer,
  Provider,
  children,
}: ContextStoreProviderProps<S, T>) {
  const [storeState, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ store: storeState, dispatch }}>{children}</Provider>
  );
}

export function createContextStore<
  S extends { [key in string | number | symbol]: any },
  A extends ContextStoreAction
>({ initState, reducer, namespace }: StoreInit<S, A>) {
  // const [storeState, dispatch] = useReducer(reducer, initState);
  const context = createContext<{
    store: ReducerState<ContextStoreProviderProps<S, A>["reducer"]>;
    dispatch: Dispatch<
      ReducerAction<ContextStoreProviderProps<S, A>["reducer"]>
    >;
  }>({
    store: initState,
    dispatch: (val: any) => {},
  });
  context.displayName = namespace;
  return {
    useStoreContext: () => useContext(context),
    StoreConsumer: context.Consumer,
    StoreProvider: ({ children }: { children: ReactNode | ReactNode[] }) => {
      return (
        <ContextStoreProvider
          reducer={reducer}
          initialState={initState}
          Provider={context.Provider}
          children={children}
        />
      );
    },
  };
}

export default createContextStore;
