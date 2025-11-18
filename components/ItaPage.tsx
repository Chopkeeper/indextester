import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from './PageHeader';
import { ItaItem, getItaItems } from '../services/db';
import { DocumentTextIcon } from './Icons';

interface GroupedItaItems {
    [year: number]: ItaItem[];
}

const ItaPage: React.FC = () => {
    const [groupedItems, setGroupedItems] = useState<GroupedItaItems>({});
    const [isLoading, setIsLoading] = useState(true);
    const [openYear, setOpenYear] = useState<number | null>(null);

    const fetchAndGroupItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const items = await getItaItems();
            const grouped = items.reduce((acc, item) => {
                const year = item.year;
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(item);
                return acc;
            }, {} as GroupedItaItems);
            setGroupedItems(grouped);
            // Automatically open the latest year
            const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);
            if (years.length > 0) {
                setOpenYear(years[0]);
            }
        } catch (error) {
            console.error("Failed to fetch ITA items:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAndGroupItems();
    }, [fetchAndGroupItems]);

    const toggleYear = (year: number) => {
        setOpenYear(openYear === year ? null : year);
    };
    
    const handleViewPdf = (pdfBase64: string, title: string) => {
        const pdfWindow = window.open("");
        if (pdfWindow) {
             pdfWindow.document.title = title;
             pdfWindow.document.write(
                `<html style="height:100%; margin:0;"><body style="height:100%; margin:0;"><iframe width='100%' height='100%' src='data:application/pdf;base64,${pdfBase64}'></iframe></body></html>`
             );
        } else {
            alert("Please allow pop-ups for this website to view PDF documents.");
        }
    };
    
    const years = Object.keys(groupedItems).map(Number).sort((a, b) => b - a);

    return (
        <main>
            <PageHeader title="ITA" breadcrumb="ITA" />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h3 className="text-brand-blue font-semibold text-lg mb-2">ITA</h3>
                        <h2 className="text-4xl font-bold text-brand-blue-dark">การประเมินคุณธรรมและความโปร่งใส</h2>
                    </div>
                    
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading documents...</p>
                    ) : years.length > 0 ? (
                        <div className="space-y-4">
                            {years.map(year => (
                                <div key={year} className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => toggleYear(year)}
                                        className="w-full flex justify-between items-center p-4 text-left bg-brand-blue-light hover:bg-gray-200 transition"
                                    >
                                        <h3 className="text-2xl font-bold text-brand-blue-dark">ปี พ.ศ. {year}</h3>
                                        <svg 
                                           className={`w-6 h-6 transform transition-transform ${openYear === year ? 'rotate-180' : ''}`} 
                                           fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openYear === year && (
                                        <div className="p-4 border-t border-gray-200">
                                            <ul className="space-y-3">
                                                {groupedItems[year].map(item => (
                                                    <li key={item.id}>
                                                        <button 
                                                            onClick={() => handleViewPdf(item.pdfFile, item.title)}
                                                            className="w-full text-left flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 transition group"
                                                        >
                                                            <DocumentTextIcon className="w-6 h-6 text-brand-blue flex-shrink-0" />
                                                            <span className="text-brand-secondary group-hover:text-brand-blue-dark">{item.title}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-12 text-gray-500">
                            <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-300" />
                            <h3 className="mt-4 text-xl font-semibold">No ITA Documents Found</h3>
                            <p className="mt-2 text-sm">There are currently no documents available.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ItaPage;
