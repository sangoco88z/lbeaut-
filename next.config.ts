import type { NextConfig } from "next";
import { noIndex, publicOrigin } from "./lib/indexing";

const config: NextConfig = {
  async headers() {
    const canonicalHost = publicOrigin?.hostname.replace(/\./g, "\\.");
    return [{
      source: "/:path*",
      ...(canonicalHost ? { missing: [{ type: "host" as const, value: "^" + canonicalHost + "$" }] } : {}),
      headers: [{ key: "X-Robots-Tag", value: noIndex }],
    }];
  },
};

export default config;

