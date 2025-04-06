'use client';

import { Calendar } from '@/components/Calendar';
import { RegisterVacations } from '@/components/RegisterVacations';
import { Configuration } from '@/components/ui/Configuration';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { DaysInput } from '@/components/ui/DaysInput';
import { ToogleButton } from '@/components/ui/ToogleButton';
import { useHolidays } from '@/hooks/useHolidays';
import { Country, DateRanges, VacationRange } from '@/utils/types';
import { eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { useState } from 'react';

export default function Home() {
    const [selectedCountry, setSelectedCountry] = useState<Country>({
        code: 'CL',
        name: 'Chile',
        flag: '/flags/cl.webp'
    });

    const [selectedRange, setSelectedRange] = useState<DateRanges>({});
    const [daysWeek, setDaysWeek] = useState([0, 6]);
    const [availableDays, setAvailableDays] = useState(15); // Default available vacation days
    const [savedRanges, setSavedRanges] = useState<VacationRange[]>([]);

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        // Clean selection
        setSelectedRange({});
        setDaysWeek([0, 6]);
    };

    const countDaysInRange = () => {
        if (selectedRange && selectedRange.from && selectedRange.to) {
            const daysInRange = eachDayOfInterval({
                start: selectedRange.from,
                end: selectedRange.to
            });

            const validDays = daysInRange.filter(day => !daysWeek.includes(day.getDay()) && !holidays.some(holidays => isSameDay(parseISO(holidays.date), day)));
            return validDays.length;
        }
        return 0;
    };

    const handleSaveRange = (range: VacationRange) => {
        setSavedRanges(prev => [...prev, range]);
    };

    const clearSavedRanges = () => {
        setSavedRanges([]);
    };

    const handleDeleteRange = (index: number) => {
        setSavedRanges(prev => prev.filter((_, i) => i !== index));
    };

    const calculateUsedDays = () => {
        return savedRanges.reduce((total, range) => total + range.days, 0);
    };

    const usedDays = calculateUsedDays();
    const { holidays, loading, error } = useHolidays({ year: 2025, countryCode: selectedCountry.code });

    return (
        <>
            <div className="flex justify-between items-center p-4 bg-white dark:bg-[#212121] transition-colors duration-200">
                <div className="flex gap-4 items-center">
                    <Configuration daysWeek={daysWeek} setDaysWeek={setDaysWeek} countDaysInRange={countDaysInRange} />
                    <div className="">
                        <CountrySelect
                            value={selectedCountry}
                            onChange={country => {
                                handleCountryChange(country);
                            }}
                        />
                    </div>
                </div>

                <ToogleButton />
            </div>

            <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-[#212121] transition-colors duration-200">
                <div className="mb-5">
                    <div className="text-4xl font-bold sm:text-6xl text-center flex ">
                        <span className="p-4">🏝️</span>
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to to-blue-300 dark:from-green-300 dark:to-white p-4">Vacancy Planner</h1>
                    </div>
                </div>

                <DaysInput availableDays={availableDays} setAvailableDays={setAvailableDays} />

                <div className="dark:text-white">
                    <Calendar
                        holidays={holidays}
                        selectedRange={selectedRange}
                        daysWeek={daysWeek}
                        loading={loading}
                        error={error}
                        setSelectedRange={setSelectedRange}
                        countDaysInRange={countDaysInRange}
                        availableDays={availableDays}
                        usedDays={usedDays}
                        onSaveRange={handleSaveRange}
                    />
                </div>
                <div className="w-full max-w-2xl mx-auto">
                    <RegisterVacations savedRanges={savedRanges} availableDays={availableDays} usedDays={usedDays} onClearVacations={clearSavedRanges} onDeleteRange={handleDeleteRange} />
                </div>
            </div>
        </>
    );
}
