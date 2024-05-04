import { Keyword } from 'src/keyword/entities/keyword.entity';
import Transaction from '../../transaction/entities/transaction.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class TransactionCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', unique: true})
    name: string;

    @OneToMany(() => Transaction, transaction => transaction.category)
    @JoinColumn({name: 'transaction_id'})
    transactions: Transaction[];

    @OneToMany(() => Keyword, keyword => keyword.category)
    @JoinColumn({name: 'keyword_id'})
    keywords: Keyword[];

    constructor(name: string) {
        this.name = name;
    }
}

