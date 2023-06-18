import { IListItem } from "./types";

export const orderByCode = (a: IListItem, b: IListItem) => {
    return a.code > b.code ? 1 : a.code < b.code ? -1 : 0;
};