// SEO Schema utilities for structured data

interface Person {
    name: string;
    url: string;
    sameAs: string[];
    jobTitle: string;
    description: string;
}

interface Book {
    name: string;
    author: Person;
    isbn?: string;
    publisher?: string;
    datePublished?: string;
    description?: string;
    url?: string;
    image?: string;
}

interface Article {
    headline: string;
    author: Person;
    datePublished: string;
    dateModified?: string;
    description?: string;
    url?: string;
    image?: string;
}

interface Event {
    name: string;
    startDate: string;
    location: {
        name: string;
        address?: string;
    };
    description?: string;
    organizer?: {
        name: string;
    };
}

export function generatePersonSchema(person: Person) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name,
        url: person.url,
        sameAs: person.sameAs,
        jobTitle: person.jobTitle,
        description: person.description,
    };
}

export function generateBookSchema(book: Book) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.name,
        author: {
            '@type': 'Person',
            name: book.author.name,
            url: book.author.url,
        },
        isbn: book.isbn,
        publisher: book.publisher,
        datePublished: book.datePublished,
        description: book.description,
        url: book.url,
        image: book.image,
    };
}

export function generateArticleSchema(article: Article) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        author: {
            '@type': 'Person',
            name: article.author.name,
            url: article.author.url,
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        description: article.description,
        url: article.url,
        image: article.image,
    };
}

export function generateEventSchema(event: Event) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.name,
        startDate: event.startDate,
        location: {
            '@type': 'Place',
            name: event.location.name,
            address: event.location.address,
        },
        description: event.description,
        organizer: event.organizer ? {
            '@type': 'Organization',
            name: event.organizer.name,
        } : undefined,
    };
}

export function generatePodcastSchema(podcast: {
    name: string;
    url: string;
    datePublished: string;
    description?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'PodcastEpisode',
        name: podcast.name,
        url: podcast.url,
        datePublished: podcast.datePublished,
        description: podcast.description,
    };
}
