type articleSource = {
    id: string;
    name: string;
};

interface article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: articleSource;
    title: string;
    url: string;
    urlToImage: string;
}

interface data {
    status: string;
}

interface news extends data {
    articles: article[];
    totalResults: number;
}

interface source {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface sources extends data {
    sources: source[];
}

interface event {
    target: Element;
    currentTarget: Element;
}

interface urlParams {
    endpoint: string;
    sources?: string;
}

export { articleSource, article, news, source, sources, event, urlParams };
