import './blog_v2.css';

const SkeletonCard = () => (
    <div className="post-card">
        <div className="skeleton skeleton-image" style={{ height: '200px' }}></div>
        <div className="post-card-content">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
        </div>
    </div>
);

export default function Loading() {
    return (
        <>
            <div className="blog-v2-container">
                <div className="hero-section">
                    <h1>Bloqdan axtar</h1>
                    <p>Açar sözlər və ya başlıqlar ilə axtarış et</p>
                    <div className="search-form">
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder="Məqalə adı və ya açar söz"
                                disabled
                            />
                        </div>
                        <button className="search-button" disabled>Axtar</button>
                    </div>
                </div>

                <div className="posts-grid">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}