
import React, { useState } from 'react';
import { useCompanies } from './hooks/useCompanies';
import { FiltersBar } from './components/FiltersBar';
import { CompaniesList } from './components/CompaniesList';
import { PaginationControls } from './components/PaginationControls';
import { ViewMode } from './types';

function App() {
    const {
        loading,
        error,
        paginatedCompanies,
        filters,
        setFilters,
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        totalPages,
        uniqueLocations,
        uniqueIndustries,
        totalResults,
        retry,
        clearFilters
    } = useCompanies();

    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CARD);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                        Companies Directory
                    </h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <FiltersBar
                            filters={filters}
                            setFilters={setFilters}
                            sort={sort}
                            setSort={setSort}
                            uniqueLocations={uniqueLocations}
                            uniqueIndustries={uniqueIndustries}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            clearFilters={clearFilters}
                            totalResults={totalResults}
                        />

                        <div className="mt-6">
                           <CompaniesList
                                companies={paginatedCompanies}
                                loading={loading}
                                error={error}
                                viewMode={viewMode}
                                retry={retry}
                                totalResults={totalResults}
                           />
                        </div>

                        <div className="mt-6">
                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
