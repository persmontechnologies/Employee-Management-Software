import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto, UpdateDocumentDto, DocumentFilterDto } from './dto/document.dto';
import { Document } from 'shared';
export declare class DocumentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDocumentDto: CreateDocumentDto): Promise<Document>;
    findAll(filter?: DocumentFilterDto): Promise<Document[]>;
    findOne(id: string): Promise<Document>;
    findByEmployee(employeeId: string): Promise<Document[]>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document>;
    remove(id: string): Promise<Document>;
    getStatistics(): Promise<any>;
    private mapDocumentToDto;
}
