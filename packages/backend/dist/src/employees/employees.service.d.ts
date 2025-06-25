import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto, EmployeeFilterDto } from './dto/employee.dto';
import { Employee } from 'shared';
export declare class EmployeesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAll(filter?: EmployeeFilterDto): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    findByUserId(userId: string): Promise<Employee>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    remove(id: string): Promise<Employee>;
    private mapEmployeeToDto;
}
