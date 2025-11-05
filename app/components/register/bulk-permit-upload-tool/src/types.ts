
import { WorkBook } from "xlsx";

export interface SheetData {
    sheetNames: string[];
    workbook: WorkBook;
}

export interface ELink {
    url: string;
}

export interface Keyword {
    identifier: string;
    name?: string;
}

export interface ProcessedKeywords {
    processedKeywords: Keyword[];
    otherKeywords: string;
}

export interface FieldMapping {
    [key: string]: any;
}

export interface Field {
    [key: string]: any;
}

export interface ImportCache {
    fields: {
        [key: string]: {
            [key: string]: NationalRecord;
        };
    };
}

export interface NationalRecord {
    header: {
        identifier?: string;
        schema: string;
        languages: string[];
    };
    government?: {
        identifier: string;
    };
    emails?: string[];
    type?: string;
    organization?: {
        [key: string]: string;
    };
    organizationAcronym?: {
        [key: string]: string;
    };
    firstName?: string;
    lastName?: string;
    country?: {
        identifier: string;
    };
    address?: {
        [key: string]: string;
    };
}

export interface Country {
    code: string;
    name: {
        [key: string]: string;
    };
}

export interface ProgressTracking {
    value: number;
}
