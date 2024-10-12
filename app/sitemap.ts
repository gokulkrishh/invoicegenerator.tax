import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://boxbox.club",
      lastModified: new Date(),
    },
    {
      url: "https://boxbox.club/Privacy.html",
      lastModified: new Date(),
    },
    {
      url: "https://boxbox.club/Terms.html",
      lastModified: new Date(),
    },
  ];
}
