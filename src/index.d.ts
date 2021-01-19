import { Context as ReactContext } from "react";
import { ContextScope, Store, StoreApi, Union } from "store-api";

export function Context(...args: Parameters<ReactContext<ContextScope>["Provider"]>): ReturnType<ReactContext<ContextScope>["Provider"]>;

export function useStoreState<State, Api extends StoreApi<State>>(
  store: Store<State, Api>,
): State;

export function useUnionState<Depends extends { [key: string]: Store<any, any> }>(
  union: Union<Depends>,
): any;

export function useContext<Result>(callback: () => Result): Result;

export function useServerContext(callback: () => any): Promise<void>;

export function allSettled(
  promises: Array<Promise<any>>
): Promise<
  Array<{ status: "fulfilled" | "rejected"; value?: any; reason?: any }>
>
