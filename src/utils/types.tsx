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

export interface VacationRange {
    from: Date;
    to: Date;
    days: number;
    status?: 'Pending' | 'Approved' | 'Rejected';
}

export interface RegisterVacationsProps {
    savedRanges: VacationRange[];
    availableDays: number;
    usedDays: number;
    onClearVacations?: () => void;
}
