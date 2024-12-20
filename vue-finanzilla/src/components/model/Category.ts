import type KeywordDto from './KeywordDto';

export class Category {
    id: number | undefined;
    name: string;
    keywords: KeywordDto[];
    isWants: number | undefined;
    color: string | undefined;

    constructor(
        id: number | undefined,
        name: string,
        keywords: KeywordDto[],
        isWants: number | undefined,
        color: string | undefined
    ) {
        this.id = id;
        this.name = name;
        this.keywords = keywords;
        this.isWants = isWants;
        this.color = color;
    }
}
