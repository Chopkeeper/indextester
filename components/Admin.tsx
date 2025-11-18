import React, { useState, useEffect, FormEvent, useCallback, ChangeEvent } from 'react';
import { PlusIcon, SaveIcon, PencilIcon, TrashIcon, ArrowLeftIcon, NewspaperIcon, LogoutIcon, SearchIcon, UploadIcon } from './Icons';
import { DbNewsArticle, getNews, addNews, updateNews, deleteNews } from '../services/db';
import AdminIta from './AdminIta';
import AdminUsers from './AdminUsers';
import { useAuth } from './AuthContext';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const AdminNews: React.FC = () => {
    const [articles, setArticles] = useState<DbNewsArticle[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedArticles = await getNews();
            setArticles(fetchedArticles);
        } catch (error) {
            console.error("Failed to load news from database", error);
            alert('Failed to load news from the local database.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);
    
    const resetForm = () => {
        setTitle('');
        setContent('');
        setEditingId(null);
        setImageFile(null);
        setImagePreview(null);
        setCurrentImageUrl(null);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setCurrentImageUrl(null); // New file overrides old one
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setCurrentImageUrl(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Title and content cannot be empty.');
            return;
        }

        try {
            let imageBase64: string | null = null;
            if (imageFile) {
                imageBase64 = await fileToBase64(imageFile);
            }

            if (editingId) {
                const finalImage = imageFile ? imageBase64 : currentImageUrl;
                await updateNews(editingId, title, content, finalImage);
            } else {
                await addNews(title, content, imageBase64);
            }
    
            resetForm();
            await fetchArticles();
        } catch(error) {
            console.error("Failed to save article:", error);
            alert("Failed to save article. Please check the console for details.");
        }
    };

    const handleEdit = (article: DbNewsArticle) => {
        setEditingId(article.id);
        setTitle(article.title);
        setContent(article.content);
        setImageFile(null);
        setImagePreview(null);
        setCurrentImageUrl(article.image_base64 || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            try {
                await deleteNews(id);
                await fetchArticles();
            } catch(error) {
                 console.error("Failed to delete article:", error);
                 alert("Failed to delete article. Please check the console for details.");
            }
        }
    };

    const filteredArticles = articles.filter(
        article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

                        <div>
                             <label className="block text-sm font-medium text-gray-600">Image</label>
                             <div className="mt-2">
                                {(imagePreview || currentImageUrl) && (
                                    <div className="mb-4 relative">
                                        <img src={imagePreview || currentImageUrl || ''} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                                        <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <label className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center space-x-2 cursor-pointer hover:bg-gray-50">
                                    <UploadIcon className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600 truncate">{imageFile ? imageFile.name : 'Choose an image...'}</span>
                                    <input type="file" id="imageFile" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center space-x-2">
                                {editingId ? <SaveIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                <span>{editingId ? 'Update Article' : 'Add Article'}</span>
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
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">Published Articles ({articles.length})</h2>
                    
                    <div className="mb-6 relative">
                        <input
                            type="text"
                            placeholder="Search articles by title or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading articles...</p>
                    ) : articles.length > 0 ? (
                         filteredArticles.length > 0 ? (
                            <div className="space-y-4">
                                {filteredArticles.map(article => (
                                    <div key={article.id} className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md hover:border-brand-blue">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-start flex-grow">
                                                {article.image_base64 && (
                                                    <img src={article.image_base64} alt={article.title} className="w-24 h-24 sm:w-32 sm:h-20 object-cover rounded-md mr-4 flex-shrink-0" />
                                                )}
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-lg text-brand-blue-dark">{article.title}</h3>
                                                    <p className="text-brand-secondary my-2 text-sm hidden sm:block">{article.content.length > 100 ? article.content.slice(0, 100) + '...' : article.content}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(article.created_at).toLocaleString()}
                                                    </p>
                                                </div>
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
                               <SearchIcon className="w-16 h-16 mx-auto text-gray-300" />
                               <h3 className="mt-4 text-xl font-semibold">No Matching Articles</h3>
                               <p className="mt-2 text-sm">Your search for "{searchTerm}" did not find any articles.</p>
                           </div>
                        )
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
  const [activeTab, setActiveTab] = useState<'news' | 'ita' | 'users'>('news');
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-brand-blue-dark mb-2 sm:mb-0">Admin Dashboard</h1>
            {currentUser && <p className="text-gray-500">Logged in as: <span className="font-semibold text-brand-blue-dark">{currentUser.id}</span></p>}
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 self-start sm:self-center">
            <a href="#home" className="inline-flex items-center space-x-2 bg-white text-brand-blue-dark font-semibold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Site</span>
            </a>
            <button onClick={logout} className="inline-flex items-center space-x-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                <LogoutIcon className="w-5 h-5"/>
                <span>Logout</span>
            </button>
          </div>
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
                <button
                    onClick={() => setActiveTab('users')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 ${
                        activeTab === 'users'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    User Management
                </button>
            </nav>
        </div>

        {activeTab === 'news' && <AdminNews />}
        {activeTab === 'ita' && <AdminIta />}
        {activeTab === 'users' && <AdminUsers />}

      </div>
    </div>
  );
};

export default Admin;