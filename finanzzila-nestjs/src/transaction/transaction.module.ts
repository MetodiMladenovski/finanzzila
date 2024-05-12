
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Transaction from './entities/transaction.entity'
import { Keyword } from 'src/keyword/entities/keyword.entity';
import { KeywordService } from 'src/keyword/keyword.service';
import { TransactionCategory } from './entities/transaction-category.entity';
import { TransactionCategoryService } from './transaction-category.service';
import { TransactionCategoryController } from './transaction-category.controller';
import { CategorySubscriber } from './category-subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionCategory, Keyword, Transaction])],
    controllers: [TransactionController, TransactionCategoryController],
    providers: [TransactionService, TransactionCategoryService, KeywordService, CategorySubscriber],
})
export class TransactionModule { }

