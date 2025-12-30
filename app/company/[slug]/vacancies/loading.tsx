import React from 'react';
import './page.css';

const VacancySkeleton = () => (
    <div className="job-card skeleton-card">
        <div className="job-card-header">
            <div className="job-card-title">
                <div className="skeleton skeleton-text skeleton-title"></div>
            </div>
        </div>
        <div className="job-card-details">
            <div className="skeleton skeleton-text skeleton-detail"></div>
            <div className="skeleton skeleton-text skeleton-detail"></div>
        </div>
        <div className="skeleton skeleton-button"></div>
    </div>
);

export default function Loading() {
    return (
        <div className="job-listings">
            {Array.from({ length: 5 }).map((_, index) => (
                <VacancySkeleton key={index} />
            ))}
        </div>
    );
}