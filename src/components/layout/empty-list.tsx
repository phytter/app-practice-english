import { FileSearch } from 'lucide-react';
import React from 'react';

const EmptyList: React.FC = () => {
  return (
    <div className="ml-4 flex gap-2 items-center text-gray-500 mt-4">
      <FileSearch className="text-6xl" />
      <p>No results found</p>
    </div>
  );
};

export default EmptyList;
