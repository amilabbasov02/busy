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


  return (
    <select ref={selectRef} {...props}>
      {children}
    </select>
  );
};

export default BootstrapSelect;