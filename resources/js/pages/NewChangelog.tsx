import React from "react";
import { ChangelogForm } from "../components/forms/changelog/ChangelogForm";
import { Layout } from "../components/layout/Layout";

export function NewChangelog() {
  return (
    <Layout>
      <div>
        <h2>New Changelog entry</h2>
        <ChangelogForm />
      </div>
    </Layout>
  );
}
