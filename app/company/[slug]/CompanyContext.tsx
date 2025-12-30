"use client";
import { createContext } from 'react';

// Define a comprehensive type based on the API response
export interface Vacancy {
    id: number;
    job_title: string;
    slug: string | null;
    created_at: string;
}

export interface Company {
    id: number;
    title: string;
    slug: string;
    logo: string;
    rating: number;
    about: string;
    website: string | null;
    email: string | null;
    phone: string | null;
    vacancies: Vacancy[];
    vacancies_count: number;
}

export const CompanyContext = createContext<Company | null>(null);