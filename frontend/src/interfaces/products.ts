import {cell} from "./interfaces";

export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    photo: string,
    cells: cell[],
    is_visible: boolean,
    generalAmount?: number,
    dimensionLine ?: string,
}
