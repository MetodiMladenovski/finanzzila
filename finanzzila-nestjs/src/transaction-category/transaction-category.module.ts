import { Module } from '@nestjs/common';
import { TransactionCategoryService } from './transaction-category.service';
import { TransactionCategoryController } from './transaction-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionCategory } from './entity/transaction-category.entity';
import { Keyword } from 'src/keyword/entities/keyword.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionCategory, Keyword])],
    controllers: [TransactionCategoryController],
    providers: [TransactionCategoryService],
})
export class TransactionCategoryModule {}
