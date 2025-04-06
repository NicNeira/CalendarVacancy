'use client';
import { DateRanges, Holiday } from '@/utils/types';
import { isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function Calendar({
    holidays,
    selectedRange,
    daysWeek,
    loading,
    error,
    setSelectedRange,
    countDaysInRange
}: {
    holidays: Holiday[];
    selectedRange: DateRanges;
    daysWeek: number[];
    loading: boolean;
    error: string | null;
    setSelectedRange: (range: DateRanges) => void;
    countDaysInRange: () => number;
}) {
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

    const daysDisabled = (date: Date) => {
        return daysWeek.includes(date.getDay()) || holidays.some(feriado => isSameDay(parseISO(feriado.date), date));
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
        </>
    );
}
