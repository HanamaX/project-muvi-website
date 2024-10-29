import React from 'react';

const Tooltip = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded py-1 px-2 w-24">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;