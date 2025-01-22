'use client'
import { feriadosChile2025 } from "@/utils/utils";
import { eachDayOfInterval, isSameDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function Calendar() {
    const [daysWeek, setDaysWeek] = useState([0, 6])
    const [selectedRange, setSelectedRange] = useState<{
        from?: Date
        to?: Date
    }>({});

    const countDaysInRange = () => {
        if (selectedRange && selectedRange.from && selectedRange.to) {
            const daysInRange = eachDayOfInterval({
                start: selectedRange.from,
                end: selectedRange.to
            })

            const validDays = daysInRange.filter(day => !daysWeek.includes(day.getDay()) && !feriadosChile2025.some(d => isSameDay(parseISO(d.fecha), day)))
            return validDays.length
        }
        return 0;
    };

    const daysDisabled = (date: Date) => {
        return daysWeek.includes(date.getDay()) || feriadosChile2025.some(feriado => isSameDay(parseISO(feriado.fecha), date))
    }

    const disabledDayWeek = (day: number) => {
        let daysFilter: number[]
        if (daysWeek.includes(day)) {
            daysFilter = daysWeek.filter(d => d !== day)
        } else {
            daysFilter = [...daysWeek, day]
        }
        setDaysWeek(daysFilter)
        countDaysInRange()
    }

    const specialDay = feriadosChile2025.map(d => new Date(d.fecha + ' 00:00:00'))
    const ranges = [
        { user: 'juanito', from: new Date('2025-01-02 00:00:00'), to: new Date('2025-01-08 00:00:00'), color: 'bg-red-200' },
        { user: 'pacho', from: new Date('2025-01-09 00:00:00'), to: new Date('2025-01-13 00:00:00'), color: 'bg-blue-200' },
        { user: 'nico', from: new Date('2025-02-14 00:00:00'), to: new Date('2025-02-21 00:00:00'), color: 'bg-green-200' },
    ]

    return (
        <>
            <div className="flex gap-5 justify-around">
                <span>Fecha de inicio: {selectedRange && selectedRange.from ? selectedRange.from?.toLocaleDateString() : 'dd/mm/yyyy'}</span>
                <span>Fecha de término: {selectedRange && selectedRange.to ? selectedRange.to?.toLocaleDateString() : 'dd/mm/yyyy'}</span>
            </div>

            <div className="text-black bg-blue-200 dark:bg-green-200 text-center rounded p-3 my-3 font-semibold">
                Estás solicitando <span className="font-bold text-green-500 dark:text-blue-500">{countDaysInRange()} </span>días hábiles de vacaciones
            </div >

            <DayPicker
                modifiers={{
                    special: specialDay,
                    // ...ranges.reduce((acc, range) => {
                    //     acc[range.color] = (date) => date >= range.from && date <= range.to;
                    //     return acc;
                    // }, {})
                }}


                modifiersClassNames={{
                    special: 'text-red-500 font-bold',
                    // ...ranges.reduce((acc, range) => {
                    //     acc[range.color] = range.color;
                    //     return acc;
                    // }, {})
                }}

                modifiersStyles={{

                }}
                classNames={{
                    day: 'rounded-lg hover:bg-opacity-50 border-2 border-white dark:border-[#212121] transition-colors duration-200',

                    selected: 'border-transparent bg-red-200',
                    range_end: 'bg-red-200',
                    range_middle: 'bg-red-200',
                    range_start: 'bg-red-200',
                    disabled: '!bg-gray-200 text-gray-500',
                    today: 'font-bold',

                }}
                locale={es}
                // autoFocus
                // weekStartsOn={1}
                // showOutsideDays
                disabled={daysDisabled}
                numberOfMonths={2}
                mode="range"
                selected={selectedRange as DateRange}
                onSelect={(range) =>
                    setSelectedRange({
                        from: range?.from ?? undefined,
                        to: range?.to ?? undefined
                    })
                }
            />
            <details>
                <summary>Config</summary>
                <div>

                    {
                        ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados'].map((day, i) => <div key={i} className="flex gap-5 justify-between w-[200px]"><label className="bg-blue-200 w-full" htmlFor={day}>{day}</label><input id={day} type="checkbox" className="w-5 h-5" onClick={() => disabledDayWeek(i)} /></div>)
                    }
                </div>
            </details>
        </>
    );
}