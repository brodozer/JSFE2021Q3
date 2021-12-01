import { urlParams, news, sources } from '../interfaces';

class Model {
    baseLink: string;
    apiKey: string;
    constructor(baseLink: string, apiKey: string) {
        this.baseLink = baseLink;
        this.apiKey = apiKey;
    }

    makeUrl(options: urlParams): string {
        let url = `${this.baseLink}${options.endpoint}?apiKey=${this.apiKey}`;
        if (options.hasOwnProperty('sources')) {
            url += `&sources=${options.sources}`;
        }
        return url;
    }

    async getResp(method: string, url: string): Promise<sources | news> {
        const res = await fetch(url, { method });
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return await res.json();
    }
}

export default Model;
