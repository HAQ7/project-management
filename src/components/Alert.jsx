import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ 
  type = 'success', 
  message, 
  className = '',
}) => {
  const styles = {
    info: {
      wrapper: 'bg-blue-100 border-blue-500 text-blue-700',
      icon: <Info className="w-5 h-5" />
    },
    success: {
      wrapper: 'bg-green-100 border-green-500 text-green-700',
      icon: <CheckCircle className="w-5 h-5" />
    },
    warning: {
      wrapper: 'bg-yellow-100 border-yellow-500 text-yellow-700',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    error: {
      wrapper: 'bg-red-100 border-red-500 text-red-700',
      icon: <XCircle className="w-5 h-5" />
    }
  };

  return (
    <div className={`flex items-center p-4 border-l-4 rounded ${styles[type].wrapper} ${className}`}>
      <div className="flex-shrink-0 mr-3">
        {styles[type].icon}
      </div>
      <div className="text-sm font-medium">
        {message}
      </div>
    </div>
  );
};

export default Alert;