"use client";
import React, { useEffect, useRef } from 'react';

interface DropifyInputProps {
  name: string;
  id: string;
  multiple?: boolean;
}

const DropifyInput: React.FC<DropifyInputProps> = ({ name, id, multiple = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$) {
      const $ = (window as any).$;
      if (inputRef.current && $.fn.dropify) {
        $(inputRef.current).dropify();
      }
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="file"
      name={name}
      id={id}
      className="dropify"
      multiple={multiple}
    />
  );
};

export default DropifyInput;