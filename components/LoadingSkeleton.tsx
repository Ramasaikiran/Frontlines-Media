
import React from 'react';
import { ViewMode } from '../types';

interface LoadingSkeletonProps {
    viewMode: ViewMode;
}

const SkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-start mb-4">
            <div className="w-16 h-16 rounded-full mr-4 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
        <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="space-y-2 mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
    </div>
);

const SkeletonRow: React.FC = () => (
    <tr className="bg-white dark:bg-gray-800 animate-pulse">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="ml-4 w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div></td>
        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div></td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div></td>
    </tr>
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ viewMode }) => {
    const items = Array.from({ length: 6 });
    if (viewMode === ViewMode.TABLE) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                     <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Industry & Founded</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Website</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {items.map((_, index) => <SkeletonRow key={index} />)}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((_, index) => <SkeletonCard key={index} />)}
        </div>
    );
};
