import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

@Controller('keywords')
export class KeywordController {
    constructor(private readonly keywordService: KeywordService) { }

    @Post()
    create(@Body() createKeywordDto: CreateKeywordDto) {
        return this.keywordService.create(createKeywordDto);
    }

    @Get()
    findAll() {
        return this.keywordService.findAll();
    }

    @Get('categories/:id')
    findAllByCategory(@Param(':id') id: number) {
        return this.keywordService.findAllByCategoryId(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.keywordService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateKeywordDto: UpdateKeywordDto) {
        return this.keywordService.update(+id, updateKeywordDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): void {
        this.keywordService.remove(+id);
    }
}
