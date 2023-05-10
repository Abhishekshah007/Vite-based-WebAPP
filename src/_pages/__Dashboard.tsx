import React, { useState } from 'react';
import Charts from './__Charts'; // import your chart components here
import Contacts from './__Contacts';

interface PageData {
  title: string;
  content: React.ReactNode;
}

const DashboardPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData>({
    title: 'Contact Page',
    content: <ContactPage />,
  });

  const handleClick = (title: string, content: React.ReactNode) => {
    setPageData({
      title,
      content,
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex w-full md:w-1/6 bg-gray-100 h-screen items-center justify-center ">
        <div className="rounded-md shadow-md p-4">
          <button
            className={`w-full text-left py-2 px-4 ${
              pageData.title === 'Contact Page' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleClick('Contact Page', <ContactPage />)}
          >
            Contact
          </button>
          <button
            className={`w-full text-left py-2 px-4 ${
              pageData.title === 'Charts and Maps' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleClick('Charts and Maps', <Charts />)}
          >
            Charts and Maps
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-300">
        <h1 className="text-2xl font-semibold mb-4">{pageData.title}</h1>
        {pageData.content}
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div>
      <Contacts />
    </div>
  );
};

export default DashboardPage;
