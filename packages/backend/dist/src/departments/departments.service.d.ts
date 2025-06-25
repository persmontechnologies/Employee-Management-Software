import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentFilterDto } from './dto/department.dto';
import { Department } from 'shared';
export declare class DepartmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findAll(filter?: DepartmentFilterDto): Promise<Department[]>;
    findOne(id: string): Promise<Department>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    remove(id: string): Promise<Department>;
    getStatistics(): Promise<any>;
}
