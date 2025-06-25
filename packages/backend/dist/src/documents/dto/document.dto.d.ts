import { DocumentType } from 'shared';
export declare class CreateDocumentDto {
    employeeId: string;
    type: DocumentType;
    name: string;
    url: string;
}
export declare class UpdateDocumentDto {
    type?: DocumentType;
    name?: string;
    url?: string;
}
export declare class DocumentResponseDto {
    id: string;
    employeeId: string;
    type: DocumentType;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class DocumentFilterDto {
    employeeId?: string;
    type?: DocumentType;
    search?: string;
}
