import { Department } from "../../departments/entities/department.entity";
import { Center } from "../../centers/entities/center.entity";
import { Turn } from "../../turns/entities/turn.entity";
export declare class Course {
    id: string;
    name: string;
    code: string;
    description: string;
    departmentId: string;
    centerId: string;
    turnId: string;
    modality: "presencial" | "virtual";
    capacity: number;
    enrolled: number;
    startDate: string;
    endDate: string;
    schedule: string;
    teacher: string;
    status: "active" | "inactive" | "full";
    department: Department;
    center: Center;
    turn: Turn;
    createdAt: Date;
    updatedAt: Date;
}
