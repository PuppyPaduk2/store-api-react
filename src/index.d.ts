import { Context as ReactContext } from "react";
import { ContextScope, StoreInstance, ConfigApi } from "store-api";

export function Context(
  ...args: Parameters<ReactContext<ContextScope>["Provider"]>
): ReturnType<ReactContext<ContextScope>["Provider"]>;

export function useContext<Result>(callback: () => Result): Result;

export function useStore<State, Api extends ConfigApi<State>>(
  store: StoreInstance<State, Api>,
): State;
