import { useState, useEffect } from 'react';

interface HolidayParams {
    year: number;
    countryCode: string;
}

interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[] | null;
    launchYear: number | null;
    types: string[];
}

export function useHolidays({ year, countryCode }: HolidayParams) {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        async function fetchHolidays() {
            try {
                const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los feriados');
                }
                const data: Holiday[] = await response.json();
                setHolidays(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchHolidays();
    }, [year, countryCode]);

    return { holidays, loading, error };
}
