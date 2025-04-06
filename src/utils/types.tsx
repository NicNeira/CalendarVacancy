export interface Country {
    code: string;
    name: string;
    flag: string;
}

export interface DateRanges {
    from?: Date;
    to?: Date;
}

export interface Holiday {
    date: string;
    day: string;
    name: string;
    type: string;
    countryCode?: string;
}

export interface HolidayParams {
    year: number;
    countryCode: string;
}
