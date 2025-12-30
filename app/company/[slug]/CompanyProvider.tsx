"use client";

import React from 'react';
import { CompanyContext, Company } from './CompanyContext';

const CompanyProvider = ({ value, children }: { value: Company, children: React.ReactNode }) => {
    return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};

export default CompanyProvider;