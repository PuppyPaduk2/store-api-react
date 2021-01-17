import { Context as ReactContext } from "react";
import { ContextScope, Store, StoreApi, Union } from "store-api";

export type Context = ReactContext<ContextScope>;

export function useStoreState<State, Api extends StoreApi<State>>(
  store: Store<State, Api>,
): State;

export function useUnionState<Depends extends { [key: string]: Store<any, any> }>(
  union: Union<Depends>,
): any;

export function useContext<Result>(callback: () => Result): Result;
