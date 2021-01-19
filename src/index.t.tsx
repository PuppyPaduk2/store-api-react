import * as React from "react";
import { Context } from "./index";
import { context } from "store-api";

const app = context();

export const Page: React.FC = () => {
  return (
    <div>
      <Context value={app}></Context>
    </div>
  )
};
