import { Calendar } from "@/components/Calendar";
import { ToogleButton } from "@/components/ToogleButton";

export default function Home() {
  return (
    <>
      <ToogleButton />
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="mb-10">
          <h1 className="text-4xl text-gray-900 dark:text-white">
            🏝️ Vacancy Planner
          </h1>
        </div>
        <div className="dark:text-white">
          <Calendar />
        </div>
      </div>
    </>
  );
}
