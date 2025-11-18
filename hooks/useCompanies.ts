
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Company, Filters, Sort } from '../types';
import { mockCompanies } from '../data/mockData';
import { ITEMS_PER_PAGE } from '../constants';

const fetchCompanies = (): Promise<Company[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCompanies);
        }, 500); // Simulate network delay
    });
};

export function useCompanies() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<Filters>({
        search: '',
        location: 'all',
        industries: [],
    });

    const [sort, setSort] = useState<Sort>({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const getCompanies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCompanies();
            setCompanies(data);
        } catch (err) {
            setError('Failed to fetch companies. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCompanies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const uniqueLocations = useMemo(() => {
        const locations = new Set(companies.map(c => `${c.location.city}, ${c.location.state || c.location.country}`));
        return ['all', ...Array.from(locations).sort()];
    }, [companies]);

    const uniqueIndustries = useMemo(() => {
        const industries = new Set(companies.map(c => c.industry));
        return Array.from(industries).sort();
    }, [companies]);

    const filteredCompanies = useMemo(() => {
        let result = companies;

        // Apply search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(
                c =>
                    c.name.toLowerCase().includes(searchTerm) ||
                    c.shortDescription.toLowerCase().includes(searchTerm)
            );
        }

        // Apply location filter
        if (filters.location !== 'all') {
            result = result.filter(c => `${c.location.city}, ${c.location.state || c.location.country}` === filters.location);
        }

        // Apply industry filter
        if (filters.industries.length > 0) {
            result = result.filter(c => filters.industries.includes(c.industry));
        }

        // Apply sorting
        result.sort((a, b) => {
            const aValue = a[sort.key];
            const bValue = b[sort.key];

            if (aValue === undefined || bValue === undefined) return 0;

            if (aValue < bValue) {
                return sort.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return result;
    }, [companies, filters, sort]);

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

    const paginatedCompanies = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredCompanies, currentPage]);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sort]);
    
    const clearFilters = useCallback(() => {
        setFilters({
            search: '',
            location: 'all',
            industries: [],
        });
        setSort({ key: 'name', direction: 'asc' });
        setCurrentPage(1);
    }, []);

    return {
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
        totalResults: filteredCompanies.length,
        retry: getCompanies,
        clearFilters,
    };
}
