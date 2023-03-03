import React from "react";
import { Changelog } from "../components/Changelog";
import { Layout } from "../components/layout/Layout";
export function Home() {
  return (
    <Layout>
      <div>
        <h2>Changelog</h2>
        <Changelog />
      </div>
    </Layout>
  );
}
