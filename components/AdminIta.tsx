import React, { useState, useEffect, FormEvent, useCallback, ChangeEvent } from 'react';
import { PlusIcon, SaveIcon, PencilIcon, TrashIcon, DocumentTextIcon, UploadIcon } from './Icons';
import { ItaItem, getItaItems, addItaItem, updateItaItem, deleteItaItem } from '../services/db';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const AdminIta: React.FC = () => {
    const [items, setItems] = useState<ItaItem[]>([]);
    const [year, setYear] = useState<string>(new Date().getFullYear() + 543 + '');
    const [title, setTitle] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfFileName, setPdfFileName] = useState<string>('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedItems = await getItaItems();
            setItems(fetchedItems);
        } catch (error) {
            console.error("Failed to load ITA items from database", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);
    
    const resetForm = () => {
        setYear(new Date().getFullYear() + 543 + '');
        setTitle('');
        setPdfFile(null);
        setPdfFileName('');
        setEditingId(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!year || !title || (!pdfFile && !editingId)) {
            alert('Please fill all fields and select a PDF file.');
            return;
        }

        try {
            let pdfBase64 = '';
            if (pdfFile) {
                pdfBase64 = await fileToBase64(pdfFile);
            }

            if (editingId) {
                const currentItem = items.find(item => item.id === editingId);
                if (!currentItem) return;
                // If a new file is not selected, use the old one
                await updateItaItem(editingId, parseInt(year), title, pdfBase64 || currentItem.pdfFile);
                alert('ITA document updated successfully!');
            } else if (pdfBase64) {
                await addItaItem(parseInt(year), title, pdfBase64);
                alert('ITA document added successfully!');
            } else {
                alert('A PDF file is required to add a new document.');
                return;
            }
            
            resetForm();
            await fetchItems();
        } catch (error) {
            console.error('Failed to save ITA item:', error);
            alert('An error occurred while saving the document. Please try again.');
        }
    };

    const handleEdit = (item: ItaItem) => {
        setEditingId(item.id);
        setYear(item.year.toString());
        setTitle(item.title);
        setPdfFile(null);
        setPdfFileName('Keep current file');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this ITA item?')) {
            await deleteItaItem(id);
            await fetchItems();
        }
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfFile(e.target.files[0]);
            setPdfFileName(e.target.files[0].name);
        }
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <aside className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">{editingId ? 'Edit ITA Document' : 'Add New ITA Document'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-600">Year (B.E.)</label>
                            <input
                                type="number"
                                id="year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ita-title" className="block text-sm font-medium text-gray-600">Title</label>
                            <input
                                type="text"
                                id="ita-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-600">PDF File</label>
                             <label className="w-full mt-2 p-3 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 cursor-pointer hover:bg-gray-50">
                                <UploadIcon className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-600 truncate">{pdfFileName || 'Choose a file...'}</span>
                                <input type="file" id="pdfFile" accept=".pdf" onChange={handleFileChange} className="hidden" />
                            </label>
                            {editingId && !pdfFile && <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current file.</p>}
                        </div>

                        <div className="space-y-3 pt-2">
                            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center space-x-2">
                                {editingId ? <SaveIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                <span>{editingId ? 'Update Document' : 'Add Document'}</span>
                            </button>
                            {editingId && (
                                <button type="button" onClick={resetForm} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 text-center">
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </aside>

            <section className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">Published ITA Documents ({items.length})</h2>
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading documents...</p>
                    ) : items.length > 0 ? (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md hover:border-brand-blue">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-4">
                                            <DocumentTextIcon className="w-8 h-8 text-brand-blue flex-shrink-0" />
                                            <div>
                                                <h3 className="font-bold text-lg text-brand-blue-dark">{item.title}</h3>
                                                <p className="text-brand-secondary my-1 text-sm">Year: {item.year}</p>
                                                <p className="text-xs text-gray-400">
                                                  Added: {new Date(item.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 flex-shrink-0 ml-4">
                                            <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition" aria-label="Edit item">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition" aria-label="Delete item">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-300" />
                            <h3 className="mt-4 text-xl font-semibold">No ITA Documents Found</h3>
                            <p className="mt-2 text-sm">Use the form on the left to add your first document.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default AdminIta;