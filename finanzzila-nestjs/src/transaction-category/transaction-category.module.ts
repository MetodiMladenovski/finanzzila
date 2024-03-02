import { Module } from '@nestjs/common';
import { TransactionCategoryService } from './transaction-category.service';
import { TransactionCategoryController } from './transaction-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionCategory } from './entity/transaction-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionCategory])],
    controllers: [TransactionCategoryController],
    providers: [TransactionCategoryService],
})
export class TransactionCategoryModule {}