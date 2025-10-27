export interface FilterItem {
    __value: string;
    [key: string]: any;
}
export function genericFilter($query: string, items: FilterItem[] | undefined): FilterItem[] | undefined;

export interface MappingItem {
    identifier: any;
    [key: string]: any;
}
export function genericMapping(item: MappingItem): {
    identifier: any;
};
