const changelogTypes = ["add", "fix", "delete", "update"] as const;
export type TChangelogType = (typeof changelogTypes)[number];
