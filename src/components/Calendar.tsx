'use client';
// import { feriadosChile2025 } from '@/utils/utils';
import { useHolidays } from '@/hooks/useHolidays';
import { Country } from '@/utils/utils';
import { eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { CountrySelect } from './ui/CountrySelect';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function Calendar() {
    const [daysWeek, setDaysWeek] = useState([0, 6]);
    const [selectedRange, setSelectedRange] = useState<{
        from?: Date;
        to?: Date;
    }>({});
    const [selectedCountry, setSelectedCountry] = useState<Country>({
        code: 'CL',
        name: 'Chile',
        flag: '/flags/cl.webp'
    });
    // CustomHook for get holidays
    const { holidays, loading, error } = useHolidays({ year: 2025, countryCode: selectedCountry.code });

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        // Limpiar selecciones al cambiar de país
        setSelectedRange({});
        setDaysWeek([0, 6]);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-40">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

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

    const daysDisabled = (date: Date) => {
        return daysWeek.includes(date.getDay()) || holidays.some(feriado => isSameDay(parseISO(feriado.date), date));
    };

    const disabledDayWeek = (day: number) => {
        let daysFilter: number[];
        if (daysWeek.includes(day)) {
            daysFilter = daysWeek.filter(d => d !== day);
        } else {
            daysFilter = [...daysWeek, day];
        }
        setDaysWeek(daysFilter);
        countDaysInRange();
    };

    const specialDay = holidays.map(d => new Date(d.date + ' 00:00:00'));
    // const ranges = [
    //     { user: 'juanito', from: new Date('2025-01-02 00:00:00'), to: new Date('2025-01-08 00:00:00'), color: 'bg-red-200' },
    //     { user: 'pacho', from: new Date('2025-01-09 00:00:00'), to: new Date('2025-01-13 00:00:00'), color: 'bg-blue-200' },
    //     { user: 'nico', from: new Date('2025-02-14 00:00:00'), to: new Date('2025-02-21 00:00:00'), color: 'bg-green-200' },
    // ]

    // console.log('holidays', holidays);

    return (
        <>
            <div className="mb-6 flex justify-center">
                <div className="relative inline-block">
                    <CountrySelect
                        value={selectedCountry}
                        onChange={country => {
                            handleCountryChange(country);
                        }}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 justify-around">
                <span>Fecha de inicio: {selectedRange && selectedRange.from ? selectedRange.from?.toLocaleDateString() : 'dd/mm/yyyy'}</span>
                <span>Fecha de término: {selectedRange && selectedRange.to ? selectedRange.to?.toLocaleDateString() : 'dd/mm/yyyy'}</span>
            </div>

            <div className="text-black bg-blue-200 dark:bg-green-200 text-center rounded p-3 my-3 font-semibold">
                Estás solicitando <span className="font-bold text-green-500 dark:text-blue-500 ">{countDaysInRange()} </span>días hábiles de vacaciones
            </div>

            <DayPicker
                modifiers={{
                    special: specialDay
                    // ...ranges.reduce((acc, range) => {
                    //     acc[range.color] = (date) => date >= range.from && date <= range.to;
                    //     return acc;
                    // }, {})
                }}
                modifiersClassNames={{
                    special: 'text-red-500 font-bold'
                    // ...ranges.reduce((acc, range) => {
                    //     acc[range.color] = range.color;
                    //     return acc;
                    // }, {})
                }}
                modifiersStyles={{}}
                classNames={{
                    day: 'rounded-lg hover:bg-opacity-50 border-2 border-white dark:border-[#212121] transition-colors duration-200',

                    selected: 'border-transparent bg-blue-200 dark:bg-green-200 dark:text-black',
                    range_end: 'bg-blue-200 dark:bg-green-200',
                    range_middle: 'bg-blue-200 dark:bg-green-200',
                    range_start: 'bg-blue-200 dark:bg-green-200',
                    disabled: '!bg-gray-200 text-gray-500',
                    today: 'font-bold',
                    chevron: ' fill-blue-300 dark:fill-green-200'
                }}
                locale={es}
                // autoFocus
                // weekStartsOn={1}
                // showOutsideDays
                disabled={daysDisabled}
                numberOfMonths={2}
                mode="range"
                selected={selectedRange as DateRange}
                onSelect={range =>
                    setSelectedRange({
                        from: range?.from ?? undefined,
                        to: range?.to ?? undefined
                    })
                }
            />
            <details>
                <summary>Config</summary>
                <div>
                    {['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados'].map((day, i) => (
                        <div key={i} className="flex gap-5 justify-between w-[200px]">
                            <label className="bg-blue-200 w-full" htmlFor={day}>
                                {day}
                            </label>
                            <input id={day} type="checkbox" className="w-5 h-5" onClick={() => disabledDayWeek(i)} />
                        </div>
                    ))}
                </div>
            </details>
        </>
    );
}
