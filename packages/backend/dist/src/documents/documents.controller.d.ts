import { User } from 'shared';
import { DocumentsService } from './documents.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto, UpdateDocumentDto, DocumentFilterDto } from './dto/document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    private readonly prisma;
    constructor(documentsService: DocumentsService, prisma: PrismaService);
    create(createDocumentDto: CreateDocumentDto): Promise<Document>;
    findAll(filter: DocumentFilterDto): Promise<Document[]>;
    getStatistics(): Promise<any>;
    findByEmployee(employeeId: string, user: User): Promise<Document[]>;
    findOne(id: string, user: User): Promise<Document>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document>;
    remove(id: string): Promise<Document>;
    getMyDocuments(user: User): Promise<Document[]>;
}
