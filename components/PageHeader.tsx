
import React from 'react';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <div className="bg-brand-blue py-16 md:py-24 text-center text-white relative">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <nav className="text-lg">
          <a href="#home" className="hover:text-gray-300">Home</a>
          <span className="mx-2">/</span>
          <span>{breadcrumb}</span>
        </nav>
      </div>
    </div>
  );
};

export default PageHeader;
