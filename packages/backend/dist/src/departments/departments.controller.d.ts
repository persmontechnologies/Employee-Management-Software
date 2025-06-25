import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentFilterDto } from './dto/department.dto';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findAll(filter: DepartmentFilterDto): Promise<Department[]>;
    getStatistics(): Promise<any>;
    findOne(id: string): Promise<Department>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    remove(id: string): Promise<Department>;
}
