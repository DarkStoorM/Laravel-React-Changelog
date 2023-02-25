import React from "react";
import { Header } from "../components/layout/Header";
import { Layout } from "../components/layout/Layout";
export function Home() {
  return (
    <Layout>
      <Header />
      <div>
        <h2>Home Page</h2>
      </div>
    </Layout>
  );
}
