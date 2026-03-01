import { defineCollection, z } from 'astro:content';

// const blogs = defineCollection({
//     type: 'content',
//     schema: z.object({
//         title: z.string(),
//         description: z.string(),
//         date: z.date(),
//         tags: z.array(z.string()),
//         coverImage: z.string().optional(),
//     }),
// });



const podcasts = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        url: z.string().url(),
        publishedAt: z.coerce.date(),
        platform: z.string(),
        duration: z.string().optional(),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
    }),
});

const books = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string(),
        coverImage: z.string(),
        isbn: z.string().optional(),
        publisher: z.string(),
        releaseDate: z.date(),
        buyLinks: z.array(z.object({
            store: z.string(),
            url: z.string().url(),
        })).optional(),
        reviews: z.array(z.object({
            quote: z.string(),
            author: z.string(),
            source: z.string().optional(),
        })).optional(),
        mediaCoverage: z.array(z.object({
            title: z.string(),
            reviewer: z.string(),
            url: z.string().url(),
            type: z.string().optional(),
            date: z.coerce.date(),
        })).optional(),
        eventGallery: z.array(z.string()).optional(), // Array of image paths
        bookKits: z.array(z.object({
            label: z.string(),
            url: z.string(),
        })).optional(),
    }),
});

const press = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        type: z.enum(['Interview', 'Review', 'Excerpt', 'Podcast']),
        outlet: z.string(),
        url: z.string().url(),
        date: z.coerce.date(),
        thumbnail: z.string().optional(),
        embedCode: z.string().optional(),
    }),
});

const research = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.string(),
        abstract: z.string(),
        publication: z.string(),
        year: z.number(),
        url: z.string().url().optional(),
    }),
});

const conferences = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        institution: z.string(),
        abstract: z.string(),
        year: z.number(),
        mediaLinks: z.array(z.object({
            label: z.string(),
            url: z.string().url(),
        })).optional(),
        location: z.string(),
    }),
});

const films = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        collaborator: z.string(),
        description: z.string(),
        expectedRelease: z.string().optional(),
        notes: z.string().optional(),
    }),
});

const consulting = defineCollection({
    type: 'data',
    schema: z.object({
        organisation: z.string(),
        year: z.string(), // Can be a range "2020-2022"
        description: z.string(),
        domain: z.array(z.string()),
    }),
});

const articles = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        platform: z.string(),
        url: z.string().url(),
        date: z.coerce.date(),
        excerpt: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    articles,
    podcasts,
    books,
    press,
    research,
    conferences,
    films,
    consulting,
};
