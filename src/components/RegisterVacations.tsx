import { RegisterVacationsProps } from '@/utils/types';
import { Trash2 } from 'lucide-react';

export const RegisterVacations = ({ savedRanges, availableDays, usedDays, onClearVacations, onDeleteRange }: RegisterVacationsProps) => {
    return (
        <div className="mt-8 p-6  bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-green-300">Resumen de plan</h2>
                {savedRanges.length > 0 && onClearVacations && (
                    <button
                        onClick={onClearVacations}
                        className="px-4 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors duration-200">
                        Limpiar
                    </button>
                )}
            </div>

            <div className="flex justify-between mb-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Días disponibles</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{availableDays}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Días usados</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{usedDays}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Días restantes</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{availableDays - usedDays}</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Periodos de vacaciones guardados</h3>

            {savedRanges.length === 0 ? (
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">No hay periodos guardados aun</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {savedRanges.map((range, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    {range.from.toLocaleDateString('es-AR')} - {range.to.toLocaleDateString('es-AR')}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{range.days} Días tomados</p>
                            </div>
                            <button
                                onClick={() => onDeleteRange && onDeleteRange(index)}
                                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                                title="Eliminar período"
                                aria-label="Eliminar período de vacaciones">
                                <Trash2 className="text-red-500 h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
