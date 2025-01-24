'use client';
import { CountriesData } from '@/utils/utils';
import { useState } from 'react';

interface CountrySelectProps {
    value: {
        code: string;
        name: string;
        flag: string;
    };
    onChange: (country: { code: string; name: string; flag: string }) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-16">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full p-2 border rounded-lg bg-white hover:bg-gray-50">
                <img src={value.flag} alt={value.name} className="w-6 h-4 mr-2 object-fit" />
                {/* <span>{value.name}</span> */}
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border rounded-lg bg-white shadow-lg">
                    {CountriesData.map(country => (
                        <div
                            key={country.code}
                            onClick={() => {
                                onChange(country);
                                setIsOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                            <img src={country.flag} alt={country.name} className="w-6 mx-auto h-4 object-fit" />
                            {/* <span>{country.name}</span> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
