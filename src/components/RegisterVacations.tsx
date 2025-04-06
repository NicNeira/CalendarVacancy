import { RegisterVacationsProps } from '@/utils/types';

export const RegisterVacations = ({ savedRanges, availableDays, usedDays, onClearVacations }: RegisterVacationsProps) => {
    return (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-green-300">Vacation Summary</h2>
                {savedRanges.length > 0 && onClearVacations && (
                    <button
                        onClick={onClearVacations}
                        className="px-4 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors duration-200">
                        Limpiar Vacaciones
                    </button>
                )}
            </div>

            <div className="flex justify-between mb-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Available Days</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{availableDays}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Used Days</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{usedDays}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Remaining Days</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{availableDays - usedDays}</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Saved Vacation Periods</h3>

            {savedRanges.length === 0 ? (
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">No vacation periods saved yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {savedRanges.map((range, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    {range.from.toLocaleDateString()} - {range.to.toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{range.days} working days</p>
                            </div>
                            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{range.status || 'Pending'}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
