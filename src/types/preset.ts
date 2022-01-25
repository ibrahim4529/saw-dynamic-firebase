import { Criteria } from "./criteria";

export interface Preset{
    id: string
    name: String
    description: String
    criteria: Array<Criteria> | null
}