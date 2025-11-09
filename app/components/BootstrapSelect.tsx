"use client";
import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        $: any;
    }
}

interface BootstrapSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  'data-live-search'?: string;
  'data-size'?: string;
  'data-tippy-content'?: string;
}

const BootstrapSelect: React.FC<BootstrapSelectProps> = ({ children, ...props }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$) {
      const $ = (window as any).$;
      if (selectRef.current) {
        // Check if selectpicker is available, if not, wait for it.
        const interval = setInterval(() => {
          if ($.fn.selectpicker) {
            $(selectRef.current).selectpicker('refresh');
            clearInterval(interval);
          }
        }, 100); // Check every 100ms

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
      }
    }
  }, [children]);

  return (
    <select ref={selectRef} {...props}>
      {children}
    </select>
  );
};

export default BootstrapSelect;