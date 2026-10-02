import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    name, tagline, bio, location, email, phone,
    availableForWork, availabilityNote,
    "avatar": avatar.asset->url,
    "resumeUrl": resumeFile.asset->url,
    githubUrl, linkedinUrl, twitterUrl,
    stats,
    seo { metaTitle, metaDescription, keywords, "ogImage": ogImage.asset->url }
  }
`;

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...6] {
    _id, title, slug, tagline, category, status, year,
    techStack, githubUrl, liveUrl,
    metrics,
    problem, solution, impact, myRole,
    "coverImage": coverImage { "url": asset->url, alt },
    publishedAt
  }
`;

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(featured desc, order asc) {
    _id, title, slug, tagline, category, status, year,
    techStack, githubUrl, liveUrl, featured,
    metrics,
    "coverImage": coverImage { "url": asset->url, alt },
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, tagline, category, status, year,
    techStack, githubUrl, liveUrl, videoUrl,
    metrics, problem, solution, impact, myRole, teamSize, duration,
    "coverImage": coverImage { "url": asset->url, alt },
    "images": images[] { "url": asset->url, alt },
    "architectureDiagram": architectureDiagram { "url": asset->url },
    architectureDescription,
    body[] {
      ...,
      _type == "image" => { "url": asset->url, alt }
    },
    publishedAt
  }
`;

export const EXPERIENCE_QUERY = groq`
  *[_type == "experience"] | order(order asc) {
    _id, company, role, location, type,
    startDate, endDate, current,
    description, achievements, techStack,
    "logo": companyLogo { "url": asset->url },
    companyUrl
  }
`;

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "blogPost" && draft != true && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, category, tags, readTime, publishedAt,
    "coverImage": coverImage { "url": asset->url }
  }
`;

export const ALL_POSTS_QUERY = groq`
  *[_type == "blogPost" && draft != true] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, tags, readTime, publishedAt,
    "coverImage": coverImage { "url": asset->url }
  }
`;

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, tags, readTime, publishedAt,
    "coverImage": coverImage { "url": asset->url },
    body[] {
      ...,
      _type == "image" => { "url": asset->url, alt }
    }
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(featured desc, order asc) {
    _id, name, role, company, quote, relationship,
    linkedinUrl,
    "avatar": avatar { "url": asset->url }
  }
`;

export const ACHIEVEMENTS_QUERY = groq`
  *[_type == "achievement"] | order(date desc) {
    _id, title, description, icon, category, issuer, date, url, credentialId, featured
  }
`;
