import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SSCICTS",
    short_name: "SSCICTS",
    description: "Sri Sumangala College ICT Society competitions",
    start_url: "/",
    display: "standalone",
    background_color: "#07110f",
    theme_color: "#07110f",
    icons: [{ src: "/logo.png", sizes: "500x500", type: "image/png" }],
  };
}
