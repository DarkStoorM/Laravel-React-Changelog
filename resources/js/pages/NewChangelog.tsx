import React from "react";
import { ChangelogForm } from "../components/forms/changelog/ChangelogForm";
import { Header } from "../components/layout/Header";
import { Layout } from "../components/layout/Layout";

export function NewChangelog() {
  return (
    <Layout>
      <Header />
      <div>
        <h2>New Changelog record</h2>
        <ChangelogForm />
      </div>
    </Layout>
  );
}
