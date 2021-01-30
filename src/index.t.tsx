import * as React from "react";
import { Context, useContext, useStore } from "./index";
import { context, store, contract } from "store-api";

const string = store({
  init: "",
  api: ({ setState }) => ({
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      return setState(event.currentTarget.value);
    },
  }),
});

const appContract = contract({
  name: string,
});

const app = context();

export const Main = () => {
  return (
    <Context value={app}>
      <Page />
    </Context>
  );
};

export const Page: React.FC = () => {
  const name = useContext(appContract.store.name);

  return (
    <input value={useStore(name)} onChange={name.api.inputChange} />
  );
};
