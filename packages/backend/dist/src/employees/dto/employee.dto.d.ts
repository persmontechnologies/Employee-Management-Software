export declare class CreateEmployeeDto {
    userId: string;
    departmentId: string;
    position: string;
    dateOfJoining: Date;
    salary: number;
}
export declare class UpdateEmployeeDto {
    departmentId?: string;
    position?: string;
    salary?: number;
}
export declare class EmployeeResponseDto {
    id: string;
    userId: string;
    departmentId: string;
    position: string;
    dateOfJoining: Date;
    salary: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class EmployeeFilterDto {
    departmentId?: string;
    position?: string;
}
