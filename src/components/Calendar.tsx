"use client";
import { feriadosChile2025 } from "@/utils/utils";
import { eachDayOfInterval, isSameDay, isWeekend, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function Calendar() {
  const [selectedRange, setSelectedRange] = useState<{
    from?: Date | null;
    to?: Date | null;
  }>({});

  const countDaysInRange = () => {
    // if (selectedRange.from && selectedRange.to) {
    //     const timeDiff = selectedRange.to.getTime() - selectedRange.from.getTime();
    //     return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Incluye el día de inicio
    // }

    if (selectedRange && selectedRange.from && selectedRange.to) {
      const daysInRange = eachDayOfInterval({
        start: selectedRange.from,
        end: selectedRange.to,
      });

      const validDays = daysInRange.filter(
        (day) =>
          !isWeekend(day) &&
          !feriadosChile2025.some((d) => isSameDay(parseISO(d.fecha), day))
      );
      return validDays.length;
    }
    return 0; // Si no hay rango seleccionado
  };

  const daysDisabled = (date: Date) => {
    return (
      isWeekend(date) ||
      feriadosChile2025.some((feriado) =>
        isSameDay(parseISO(feriado.fecha), date)
      )
    );
  };

  return (
    <>
      <div className="flex gap-5 justify-around">
        <span>
          Fecha de inicio:{" "}
          {selectedRange && selectedRange.from
            ? selectedRange.from?.toLocaleDateString()
            : "dd/mm/yyyy"}
        </span>
        <span>
          Fecha de término:{" "}
          {selectedRange && selectedRange.to
            ? selectedRange.to?.toLocaleDateString()
            : "dd/mm/yyyy"}
        </span>
      </div>

      <div className="text-black bg-blue-200 dark:bg-green-200 text-center rounded p-3 my-3 font-semibold">
        Estás solicitando{" "}
        <span className="text-green-500 ">{countDaysInRange()} </span>
        días hábiles de vacaciones
      </div>

      <DayPicker
        classNames={{
          day: "rounded-full hover:bg-opacity-50",
          selected: "border-transparent bg-red-200",
          range_end: "bg-red-200",
          range_middle: "bg-red-200",
          range_start: "bg-red-200",
          disabled: "!bg-gray-200 text-gray-500",
          today: "font-bold",
          chevron: "fill-blue-200 dark:fill-green-200",
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
            to: range?.to ?? undefined,
          })
        }
        // footer={
        //     `Inicio: ${selectedRange.from?.toLocaleDateString()} - Fin: ${selectedRange.to?.toLocaleDateString()} ${countDaysInRange()} `
        // }
        // onDayClick={(e, a) => console.log(e, a)}
      />
    </>
  );
}
