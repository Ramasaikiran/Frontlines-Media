
import React from 'react';
import { Company } from '../types';
import { MapPin, Briefcase, Building2, Calendar, Link as LinkIcon, Users } from 'lucide-react';

interface CompanyCardProps {
    company: Company;
}

const InfoItem: React.FC<{ icon: React.ElementType; text: string | number | undefined }> = ({ icon: Icon, text }) => {
    if (!text) return null;
    return (
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{text}</span>
        </div>
    );
};

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const fullLocation = `${company.location.city}, ${company.location.state || company.location.country}`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col h-full">
            <div className="flex items-start mb-4">
                <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-100 dark:border-gray-700"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{company.name}</h3>
                    <InfoItem icon={Briefcase} text={company.industry} />
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm leading-relaxed">{company.shortDescription}</p>
            <div className="space-y-2 mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
                <InfoItem icon={MapPin} text={fullLocation} />
                <InfoItem icon={Users} text={company.size ? `Size: ${company.size}` : undefined} />
                <InfoItem icon={Calendar} text={company.founded ? `Founded: ${company.founded}` : undefined} />
                <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    <span>Visit Website</span>
                </a>
            </div>
        </div>
    );
};
