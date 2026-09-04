import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { TYPE_PROFILES } from "@/data/type-profiles";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/guides`,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.4
    }
  ];

  const resultPages: MetadataRoute.Sitemap = TYPE_PROFILES.map((profile) => ({
    url: `${siteUrl}/result?code=${profile.code}`,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticPages, ...resultPages, ...guidePages];
}
