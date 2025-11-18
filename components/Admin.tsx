import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { PlusIcon, SaveIcon, PencilIcon, TrashIcon, ArrowLeftIcon, NewspaperIcon } from './Icons';
import { NewsArticle, getArticles, addArticle, updateArticle, deleteArticle } from '../services/db';
import AdminIta from './AdminIta';

const AdminNews: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        } catch (error) {
            console.error("Failed to load news from database", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Title and content cannot be empty.');
            return;
        }

        if (editingId) {
            await updateArticle(editingId, title, content);
        } else {
            await addArticle(title, content);
        }

        setTitle('');
        setContent('');
        setEditingId(null);
        await fetchArticles();
    };

    const handleEdit = (article: NewsArticle) => {
        setEditingId(article.id);
        setTitle(article.title);
        setContent(article.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            await deleteArticle(id);
            await fetchArticles();
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setContent('');
    }

    return (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <aside className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">{editingId ? 'Edit Article' : 'Create New Article'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-600">Content</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                                required
                            ></textarea>
                        </div>
                        <div className="space-y-3 pt-2">
                            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center space-x-2">
                                {editingId ? <SaveIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                <span>{editingId ? 'Update Article' : 'Add Article'}</span>
                            </button>
                            {editingId && (
                                <button type="button" onClick={cancelEdit} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 text-center">
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </aside>

            <section className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">Published Articles ({articles.length})</h2>
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading articles...</p>
                    ) : articles.length > 0 ? (
                        <div className="space-y-4">
                            {articles.map(article => (
                                <div key={article.id} className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md hover:border-brand-blue">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-brand-blue-dark">{article.title}</h3>
                                            <p className="text-brand-secondary my-2 text-sm">{article.content}</p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(article.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 flex-shrink-0 ml-4">
                                            <button onClick={() => handleEdit(article)} className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition" aria-label="Edit article">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(article.id)} className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition" aria-label="Delete article">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <NewspaperIcon className="w-16 h-16 mx-auto text-gray-300" />
                            <h3 className="mt-4 text-xl font-semibold">No Articles Found</h3>
                            <p className="mt-2 text-sm">Use the form on the left to add your first news article.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}


const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'ita'>('news');

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <h1 className="text-4xl font-bold text-brand-blue-dark mb-4 sm:mb-0">Admin Dashboard</h1>
          <a href="#home" className="inline-flex items-center space-x-2 bg-white text-brand-blue-dark font-semibold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 self-start">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Main Site</span>
          </a>
        </header>
        
        <div className="mb-6 border-b border-gray-300">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('news')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 ${
                        activeTab === 'news'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    News Management
                </button>
                <button
                    onClick={() => setActiveTab('ita')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 ${
                        activeTab === 'ita'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    ITA Management
                </button>
            </nav>
        </div>

        {activeTab === 'news' && <AdminNews />}
        {activeTab === 'ita' && <AdminIta />}

      </div>
    </div>
  );
};

export default Admin;
