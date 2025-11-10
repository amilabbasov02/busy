"use client";

import { useEffect, useRef } from 'react';

const BootstrapSelect = (props: any) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if (typeof window.jQuery !== 'undefined' && (window.jQuery.fn as any).selectpicker) {
      const $ = window.jQuery;
      if (selectRef.current) {
        ($(selectRef.current) as any).selectpicker({
          noneSelectedText: "seçilməyib"
        });
      }
    }
  }, []);

  return (
    <select ref={selectRef} {...props}>
      {props.children}
    </select>
  );
};

export default BootstrapSelect;