
import React, { useState, useEffect, useRef } from 'react';
import { Filters, Sort, ViewMode } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { Search, MapPin, Briefcase, X, ChevronDown, Check, LayoutGrid, List } from 'lucide-react';
import { SORT_OPTIONS } from '../constants';

interface FiltersBarProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    sort: Sort;
    setSort: React.Dispatch<React.SetStateAction<Sort>>;
    uniqueLocations: string[];
    uniqueIndustries: string[];
    viewMode: ViewMode;
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    clearFilters: () => void;
    totalResults: number;
}

const IndustryDropdown: React.FC<{
    industries: string[],
    selected: string[],
    onChange: (selected: string[]) => void
}> = ({ industries, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (industry: string) => {
        const newSelected = selected.includes(industry)
            ? selected.filter(i => i !== industry)
            : [...selected, industry];
        onChange(newSelected);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left h-10 px-3 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {selected.length > 0 ? `${selected.length} selected` : 'All Industries'}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto border dark:border-gray-600">
                    <ul className="py-1">
                        {industries.map(industry => (
                            <li key={industry} onClick={() => handleToggle(industry)} className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
                                <span>{industry}</span>
                                {selected.includes(industry) && <Check className="h-4 w-4 text-indigo-600" />}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export const FiltersBar: React.FC<FiltersBarProps> = ({
    filters,
    setFilters,
    sort,
    setSort,
    uniqueLocations,
    uniqueIndustries,
    viewMode,
    setViewMode,
    clearFilters,
    totalResults,
}) => {
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        setFilters(prev => ({ ...prev, search: debouncedSearchTerm }));
    }, [debouncedSearchTerm, setFilters]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [key, direction] = e.target.value.split(':') as [Sort['key'], Sort['direction']];
        setSort({ key, direction });
    };

    const hasActiveFilters = filters.search || filters.location !== 'all' || filters.industries.length > 0;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-t-lg shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                {/* Location Filter */}
                <div className="relative">
                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                        value={filters.location}
                        onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</option>)}
                    </select>
                </div>
                {/* Industry Filter */}
                 <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-0" />
                    <IndustryDropdown
                        industries={uniqueIndustries}
                        selected={filters.industries}
                        onChange={selected => setFilters(prev => ({ ...prev, industries: selected }))}
                    />
                </div>
                {/* Sort */}
                <div>
                     <select
                        value={`${sort.key}:${sort.direction}`}
                        onChange={handleSortChange}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                    Showing <span className="font-semibold text-gray-800 dark:text-white">{totalResults}</span> companies
                    {hasActiveFilters && <button onClick={clearFilters} className="ml-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center"><X className="w-4 h-4 mr-1"/>Clear filters</button>}
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
                    <div className="inline-flex rounded-md shadow-sm">
                        <button onClick={() => setViewMode(ViewMode.CARD)} className={`px-3 py-1.5 rounded-l-md border ${viewMode === ViewMode.CARD ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
                            <LayoutGrid className="h-5 w-5" />
                        </button>
                        <button onClick={() => setViewMode(ViewMode.TABLE)} className={`px-3 py-1.5 -ml-px rounded-r-md border ${viewMode === ViewMode.TABLE ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
                            <List className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
