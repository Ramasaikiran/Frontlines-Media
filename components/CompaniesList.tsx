
import React from 'react';
import { Company, ViewMode } from '../types';
import { CompanyCard } from './CompanyCard';
import { CompanyRow } from './CompanyRow';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorState } from './ErrorState';
import { Inbox } from 'lucide-react';

interface CompaniesListProps {
    companies: Company[];
    loading: boolean;
    error: string | null;
    viewMode: ViewMode;
    retry: () => void;
    totalResults: number;
}

const EmptyState: React.FC = () => (
    <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Inbox className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No companies found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
    </div>
);


export const CompaniesList: React.FC<CompaniesListProps> = ({ companies, loading, error, viewMode, retry, totalResults }) => {
    if (loading) {
        return <LoadingSkeleton viewMode={viewMode} />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={retry} />;
    }
    
    if (totalResults === 0) {
        return <EmptyState />;
    }

    if (viewMode === ViewMode.TABLE) {
        return (
             <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
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
                            {companies.map((company) => <CompanyRow key={company.id} company={company} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </div>
    );
};
