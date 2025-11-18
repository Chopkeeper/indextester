import React, { useEffect, useState } from 'react';
import { getNews, DbNewsArticle } from '../services/db';

export default function NewsSection() {
  const [news, setNews] = useState<DbNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getNews(3);
        setNews(data);
      } catch (err) {
        console.error(err);
        setError('ไม่สามารถโหลดข่าวสารได้ในขณะนี้');
      } finally { 
        setLoading(false); 
      }
    }
    load();
  }, []);

  return (
    <section className="py-16 bg-brand-blue-light">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-brand-blue font-semibold text-lg mb-2">LATEST NEWS</h3>
            <h2 className="text-4xl font-bold text-brand-blue-dark mb-12">ข่าวสารและกิจกรรมล่าสุด</h2>

            {loading && <div className="text-brand-secondary">กำลังโหลดข่าวล่าสุด...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && news.length === 0 && <div className="text-brand-secondary">ยังไม่มีข่าวสารในขณะนี้</div>}
            
            {!loading && news.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {news.map(item => (
                    <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group">
                        {item.image_base64 && (
                           <div className="overflow-hidden h-48">
                             <img src={item.image_base64} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                           </div>
                        )}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-brand-blue-dark mb-3">{item.title}</h3>
                            <p className="text-brand-secondary flex-grow">{item.content.length > 100 ? item.content.slice(0,100) + '...' : item.content}</p>
                            <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                                {new Date(item.created_at).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>
                    </article>
                ))}
                </div>
            )}
        </div>
    </section>
  );
}