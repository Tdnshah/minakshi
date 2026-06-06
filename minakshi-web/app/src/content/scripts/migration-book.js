import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIG
const ASTRO_ARTICLES_DIR = path.join(
  __dirname,
  "../books"
);

const PAYLOAD_API = "http://localhost:3002/api/books";
const PAYLOAD_TOKEN = "009f5a42-af9b-415d-bd84-67312dde3331";

// Helper: Read all JSON files
const getArticleFiles = () => {
  return fs
    .readdirSync(ASTRO_ARTICLES_DIR)
    .filter((file) => file.endsWith(".json"));
};

const readArticle = (file) => {
  const filePath = path.join(ASTRO_ARTICLES_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

// Check if article already exists by URL
const articleExists = async (url) => {
  const res = await fetch(
    `${PAYLOAD_API}?where[url][equals]=${encodeURIComponent(url)}`,
    {
      headers: {
        Authorization: `users API-Key ${PAYLOAD_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return data.docs.length > 0;
};

// Create article in Payload
const createArticle = async (article) => {
      console.log(article);

    const res = await fetch(PAYLOAD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `users API-Key ${PAYLOAD_TOKEN}`,
    },
    body: JSON.stringify({
      title: article.title,
      url: article.url,
      publishedAt: article.publishedAt,
      platform: article.platform,
      duration: article.location,
      description: article.description,
      thumbnail: article.thumbnail,
      slug: article.slug,
      // mediaLinks: article.mediaLinks.map(t => ({
      //   label: t.label,
      //   url: t.url
      // })),
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Status:", res.status);
    console.error("Response:", text);
    throw new Error("Failed");
  }

  return JSON.parse(text);





  // const res = await fetch(PAYLOAD_API, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `users API-Key ${PAYLOAD_TOKEN}`,
  //   },
  //   body: JSON.stringify({
  //     title: article.title,
  //     externalUrl: article.url,
  //     publishedDate: article.date,
  //     platform: article.platform,
  //     image: article.image,
  //     excerpt: article.excerpt,
  //     tags: article.tags,
  //   }),
  // });

  // if (!res.ok) {
  //   const errText = await res.text();
  //   throw new Error(errText);
  // }

  // return res.json();
};

// Main migration
const migrate = async () => {
  const files = getArticleFiles();

  console.log(`Found ${files.length} articles\n`);

  for (const file of files) {
    try {
      const article = readArticle(file);

      // const exists = await articleExists(article.url);

      if (false) {
        console.log(`⏭ Skipped (exists): ${article.title}`);
        continue;
      }

      await createArticle(article);

      console.log(`✅ Migrated: ${article.title}`);
    } catch (err) {
      console.error(`❌ Failed: ${file}`);
      console.error(err.message);
    }
  }

  console.log("\nMigration complete 🎉");
};

migrate();