'use client';

import { Calendar } from '@/components/Calendar';
import { RegisterVacations } from '@/components/RegisterVacations';
import { Configuration } from '@/components/ui/Configuration';
import { CountrySelect } from '@/components/ui/CountrySelect';
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

                <div className="flex mb-6 items-center gap-3">
                    <label htmlFor="availableDays" className=" text-gray-700 dark:text-gray-300 ">
                        Vacaciones disponibles
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            id="availableDays"
                            type="number"
                            min="0"
                            value={availableDays}
                            onChange={e => setAvailableDays(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-16 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                        <span className=" text-gray-700 dark:text-gray-300">dias</span>
                    </div>
                </div>

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
                <div>
                    <RegisterVacations savedRanges={savedRanges} availableDays={availableDays} usedDays={usedDays} onClearVacations={clearSavedRanges} />
                </div>
            </div>
        </>
    );
}
