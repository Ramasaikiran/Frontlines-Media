
import React from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
    return (
        <div className="text-center py-16 px-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-2 text-lg font-medium text-red-800 dark:text-red-200">An error occurred</h3>
            <p className="mt-1 text-sm text-red-600 dark:text-red-300">{message}</p>
            <button
                onClick={onRetry}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
            >
                <RotateCw className="mr-2 h-4 w-4" />
                Retry
            </button>
        </div>
    );
};
