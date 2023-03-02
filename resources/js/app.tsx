import "@total-typescript/ts-reset";

import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Home } from "./pages/Home";
import { NewChangelog } from "./pages/NewChangelog";
import { NotFound } from "./pages/NotFound";
import { renderIfExists } from "./utils/helpers/ComponentRenderer";

export const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.ROOT} element={<Home />} />
        <Route path={AppRoutes.CHANGELOG} element={<NewChangelog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

renderIfExists(<Main />, "app");
