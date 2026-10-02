/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://deepmoitra.dev",
  generateRobotsTxt: true,
  exclude: ["/dashboard*", "/studio*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/studio"],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority logic
    let priority = 0.8;
    if (path === "/") priority = 1.0;
    else if (path === "/projects" || path === "/case-studies") priority = 0.9;
    
    return {
      loc: path,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
