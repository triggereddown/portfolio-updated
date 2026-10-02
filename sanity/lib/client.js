import { createClient } from "next-sanity";
import * as mockData from "@/lib/mockData";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Create client only if configuration is complete
const useSanity = !!projectId;

export const client = useSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Unified data fetcher with offline fallback support
 */
export async function fetchData(query, params = {}, typeKey = "") {
  if (useSanity && client) {
    try {
      return await client.fetch(query, params);
    } catch (err) {
      console.warn("Sanity fetch failed, falling back to local database:", err);
    }
  }

  // Local fallback resolver
  if (query.includes('_type == "siteSettings"')) {
    return mockData.siteSettings;
  }
  if (query.includes('_type == "project"') && params.slug) {
    return mockData.projects.find(p => p.slug.current === params.slug) || mockData.projects[0];
  }
  if (query.includes('_type == "project"')) {
    return mockData.projects;
  }
  if (query.includes('_type == "experience"')) {
    return mockData.experience;
  }
  if (query.includes('_type == "blogPost"') && params.slug) {
    return mockData.blogPosts.find(b => b.slug.current === params.slug) || mockData.blogPosts[0];
  }
  if (query.includes('_type == "blogPost"')) {
    return mockData.blogPosts;
  }
  if (query.includes('_type == "testimonial"')) {
    return mockData.testimonials;
  }
  if (query.includes('_type == "achievement"')) {
    return mockData.achievements;
  }
  if (query.includes('_type == "caseStudy"') && params.slug) {
    return mockData.caseStudies.find(c => c.slug.current === params.slug) || mockData.caseStudies[0];
  }
  if (query.includes('_type == "caseStudy"')) {
    return mockData.caseStudies;
  }

  // Fallback to complete DB based on keyword analysis
  if (typeKey) {
    return mockData[typeKey] || [];
  }
  return [];
}
