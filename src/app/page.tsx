import { Calendar } from "@/components/Calendar";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-10">
        <h1 className="text-4xl">🏝️ Vacancy Planner </h1>
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
}
