import { Calendar } from '@/components/Calendar';
import { ToogleButton } from '@/components/ToogleButton';

export default function Home() {
    return (
        <>
            <ToogleButton />
            <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-[#212121] transition-colors duration-200">
                <div className="mb-5">
                    <div className="text-4xl font-bold sm:text-6xl text-center flex ">
                        <span className="p-4">🏝️</span>
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to to-blue-300 dark:from-green-300 dark:to-white p-4">Vacancy Planner</h1>
                    </div>
                </div>
                <div className="dark:text-white">
                    <Calendar />
                </div>
            </div>
        </>
    );
}
