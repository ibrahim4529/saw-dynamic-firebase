export enum Type{
    COST,
    BENEFIT
}
export interface Criteria{
    name: String
    type: Type
    weight: number
}