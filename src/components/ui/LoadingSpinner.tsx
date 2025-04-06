import React from 'react';

export const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
