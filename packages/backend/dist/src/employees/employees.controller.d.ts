import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto, EmployeeFilterDto } from './dto/employee.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAll(filter: EmployeeFilterDto): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    findByUserId(userId: string): Promise<Employee>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    remove(id: string): Promise<Employee>;
}
