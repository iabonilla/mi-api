export declare class CreateCourseDto {
    name: string;
    code: string;
    description?: string;
    departmentId: string;
    centerId: string;
    turnId: string;
    modality: "presencial" | "virtual";
    capacity: number;
    startDate: string;
    endDate: string;
    schedule?: string;
    teacher?: string;
}
