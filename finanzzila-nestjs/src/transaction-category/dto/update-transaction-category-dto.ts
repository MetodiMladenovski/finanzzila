import { CreateKeywordDto } from "src/keyword/dto/create-keyword.dto";

export class UpdateTransactionCategoryDto {
    name: string;
    keywords: CreateKeywordDto[];

    constructor(name: string, keywords: CreateKeywordDto[]) {
        this.name = name;
        this.keywords = keywords;
    }
}

