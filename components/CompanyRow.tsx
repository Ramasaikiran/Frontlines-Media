
import React from 'react';
import { Company } from '../types';
import { Link as LinkIcon } from 'lucide-react';

interface CompanyRowProps {
    company: Company;
}

export const CompanyRow: React.FC<CompanyRowProps> = ({ company }) => {
    const fullLocation = `${company.location.city}, ${company.location.state || company.location.country}`;

    return (
        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={company.logoUrl} alt={`${company.name} logo`} />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{company.name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-gray-300">{company.industry}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{company.founded ? `Founded ${company.founded}` : ''}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{fullLocation}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{company.shortDescription}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center">
                    Website <LinkIcon className="ml-1 h-4 w-4" />
                </a>
            </td>
        </tr>
    );
};
