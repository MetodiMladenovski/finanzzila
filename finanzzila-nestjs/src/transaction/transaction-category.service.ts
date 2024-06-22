import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category-dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category-dto';
import { KeywordService } from 'src/keyword/keyword.service';
import { Keyword } from 'src/keyword/entities/keyword.entity';
import { TransactionCategory } from './entities/transaction-category.entity';

@Injectable()
export class TransactionCategoryService {
    constructor(
        @InjectRepository(TransactionCategory)
            private readonly transactionCategoryRepository: Repository<TransactionCategory>,
        private readonly keywordService: KeywordService,
    ) { }

    findAll(): Promise<TransactionCategory[]> {
        const queryBuilder = this.transactionCategoryRepository
            .createQueryBuilder('transaction-category')
            .leftJoinAndSelect('transaction-category.keywords', 'keywords');
        return queryBuilder.getMany();
    }

    async create(createTransactionCategoryDto: CreateTransactionCategoryDto): Promise<TransactionCategory> {
        const keywords: Keyword[] = createTransactionCategoryDto.keywords.map((kd) => new Keyword(kd.value));
        const category: TransactionCategory = new TransactionCategory(
            createTransactionCategoryDto.name, keywords);
        const savedCategory = await this.transactionCategoryRepository.save(category);
        return savedCategory;
    }

    async update(id: number, updateTransactionCategoryDto: UpdateTransactionCategoryDto) : Promise<TransactionCategory>{
        const category : TransactionCategory = await this.findById(id);
        const keywords: Keyword[] = await Promise.all(updateTransactionCategoryDto.keywords.map(async (kd) => {
            if(kd.id) {
                const editingKeyword = await this.keywordService.findOne(kd.id);
                editingKeyword.value = kd.value;
                return editingKeyword;
            }
            const keyword = new Keyword(kd.value); 
            return keyword;
        }))
        try {
            category.name = updateTransactionCategoryDto.name;
            category.keywords = keywords; 
            console.log(category);
            const cat = await this.transactionCategoryRepository.save(category);
            return cat;
        } catch (e) {
            console.log("UPDATE ", e.detail); 
            if (/(value)[\s\S]+(already exists)/.test(e.detail)) {
                throw new BadRequestException(e.detail);
            }
        }
    }

    async findById(id: number): Promise<TransactionCategory> {
        const cat = await this.transactionCategoryRepository.findOne({where: {id}})
        if(!cat){
            throw new NotFoundException(`Category with ${id} was not found`);
        }
        return cat;
    }

    remove(id: number) : void {
        const options: any = { id: id };
        this.transactionCategoryRepository.delete(options);
    }

    async addKeywordForCategory(category: TransactionCategory, keyword: string){
        const catKeywords = await this.keywordService.findAllByCategoryId(category.id);
        console.log("CATKEYWORDS", catKeywords);
        console.log("keyword", keyword);
        catKeywords.push(new Keyword(keyword));
        category.keywords = catKeywords;
        this.transactionCategoryRepository.save(category);
    }
}

