"use client";
import ReactSlider from 'react-slider';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

interface NewAdvancedSearchFiltersProps {
    onSearch: (filters: any) => void;
    layout?: 'grid' | 'vertical';
    initialFilters?: any;
}

export default function NewAdvancedSearchFilters({ onSearch, layout = 'grid', initialFilters: initialFiltersProp }: NewAdvancedSearchFiltersProps) {
    const initialFilters = { employmentType: [], categories: [], professions: [], cities: [], minSalary: '', maxSalary: '', salaryType: '', experience: [] };
    const [filters, setFilters] = useState<any>(initialFiltersProp || initialFilters);

    useEffect(() => {
        if (initialFiltersProp) {
            setFilters(initialFiltersProp);
        }
    }, [initialFiltersProp]);
    
    const [availableEmploymentTypes, setAvailableEmploymentTypes] = useState<any[]>([]);
    const [availableCategories, setAvailableCategories] = useState<any[]>([]);
    const [professions, setProfessions] = useState<{ id: number; title: string }[]>([]);
    const [professionsPage, setProfessionsPage] = useState(1);
    const [hasMoreProfessions, setHasMoreProfessions] = useState(true);
    const [professionSearch, setProfessionSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(professionSearch);
    const [cities, setCities] = useState<{ id: number; title: { az: string; en: string; ru: string; } }[]>([]);
    const [citiesPage, setCitiesPage] = useState(1);
    const [hasMoreCities, setHasMoreCities] = useState(true);
    const [citySearch, setCitySearch] = useState('');
    const [debouncedCitySearch, setDebouncedCitySearch] = useState(citySearch);
    const [categorySearch, setCategorySearch] = useState('');
    const [employmentTypesPage, setEmploymentTypesPage] = useState(1);
    const [hasMoreEmploymentTypes, setHasMoreEmploymentTypes] = useState(true);
    const [employmentTypeSearch, setEmploymentTypeSearch] = useState('');
    const [debouncedEmploymentTypeSearch, setDebouncedEmploymentTypeSearch] = useState(employmentTypeSearch);
    const [availableExperiences, setAvailableExperiences] = useState<any[]>([]);
    const [experiencesPage, setExperiencesPage] = useState(1);
    const [hasMoreExperiences, setHasMoreExperiences] = useState(true);
    const [experienceSearch, setExperienceSearch] = useState('');
    const [debouncedExperienceSearch, setDebouncedExperienceSearch] = useState(experienceSearch);

    const handleFilterChange = (category: string, value: any) => {
        if (category === 'categories') {
            const categoryObject = value;
            const isSelected = filters.categories?.includes(categoryObject.id);

            let descendantIds: number[] = [];
            const getDescendantIds = (cat: any) => {
                descendantIds.push(cat.id);
                if (cat.subs && cat.subs.length > 0) {
                    cat.subs.forEach(getDescendantIds);
                }
            };
            getDescendantIds(categoryObject);
            
            let newCategoryFilters: number[];
            
            if (isSelected) {
                newCategoryFilters = filters.categories.filter((id: number) => !descendantIds.includes(id));
            } else {
                newCategoryFilters = [...(filters.categories || []), ...descendantIds];
            }

            setFilters((prev: any) => ({
                ...prev,
                categories: [...new Set(newCategoryFilters)]
            }));

        } else {
            setFilters((prevFilters: any) => {
                if (['minSalary', 'maxSalary', 'salaryType'].includes(category)) {
                    return { ...prevFilters, [category]: value };
                }
                const currentCategoryFilters = prevFilters[category] || [];
                const newCategoryFilters = currentCategoryFilters.includes(value)
                    ? currentCategoryFilters.filter((item: number) => item !== value)
                    : [...currentCategoryFilters, value];
                return { ...prevFilters, [category]: newCategoryFilters };
            });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/bff/api/filter/categories`);
                const data = await response.json();
                
                if (data && Array.isArray(data.data)) {
                    setAvailableCategories(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedEmploymentTypeSearch(employmentTypeSearch);
            setAvailableEmploymentTypes([]);
            setEmploymentTypesPage(1);
            setHasMoreEmploymentTypes(true);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [employmentTypeSearch]);

    useEffect(() => {
        const fetchEmploymentTypes = async () => {
            if (!hasMoreEmploymentTypes) return;
            if (debouncedEmploymentTypeSearch.length > 0 && debouncedEmploymentTypeSearch.length < 2) return;

            try {
                const response = await fetch(`/api/bff/api/filter/employment-types?page=${employmentTypesPage}&search=${debouncedEmploymentTypeSearch}&per_page=25`);
                const data = await response.json();
                
                if (data && Array.isArray(data.data)) {
                    setAvailableEmploymentTypes(prev => employmentTypesPage === 1 ? data.data : [...prev, ...data.data]);
                    setHasMoreEmploymentTypes(data.next_page_url !== null);
                } else {
                    setHasMoreEmploymentTypes(false);
                }
            } catch (error) {
                console.error("Failed to fetch employment types:", error);
                setHasMoreEmploymentTypes(false);
            }
        };
        fetchEmploymentTypes();
    }, [employmentTypesPage, debouncedEmploymentTypeSearch, hasMoreEmploymentTypes]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedExperienceSearch(experienceSearch);
            setAvailableExperiences([]);
            setExperiencesPage(1);
            setHasMoreExperiences(true);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [experienceSearch]);

    useEffect(() => {
        const fetchExperiences = async () => {
            if (!hasMoreExperiences) return;
            if (debouncedExperienceSearch.length > 0 && debouncedExperienceSearch.length < 2) return;

            try {
                const response = await fetch(`/api/bff/api/filter/experiences?page=${experiencesPage}&search=${debouncedExperienceSearch}&per_page=25`);
                const data = await response.json();
                
                if (data && Array.isArray(data.data)) {
                    setAvailableExperiences(prev => experiencesPage === 1 ? data.data : [...prev, ...data.data]);
                    setHasMoreExperiences(data.next_page_url !== null);
                } else {
                    setHasMoreExperiences(false);
                }
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
                setHasMoreExperiences(false);
            }
        };
        fetchExperiences();
    }, [experiencesPage, debouncedExperienceSearch, hasMoreExperiences]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(professionSearch);
            setProfessions([]);
            setProfessionsPage(1);
            setHasMoreProfessions(true);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [professionSearch]);

    useEffect(() => {
        const fetchProfessions = async () => {
            if (!hasMoreProfessions) return;
            if (debouncedSearch.length > 0 && debouncedSearch.length < 3) return;

            try {
                const response = await fetch(`/api/bff/api/filter/professions?page=${professionsPage}&search=${debouncedSearch}&per_page=25`);
                const data = await response.json();
                
                if (data && Array.isArray(data.data)) {
                    setProfessions(prev => professionsPage === 1 ? data.data : [...prev, ...data.data]);
                    setHasMoreProfessions(data.next_page_url !== null);
                } else {
                    setHasMoreProfessions(false);
                }
            } catch (error) {
                console.error("Failed to fetch professions:", error);
                setHasMoreProfessions(false);
            }
        };
        fetchProfessions();
    }, [professionsPage, debouncedSearch, hasMoreProfessions]);

    const handleProfessionsScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 200) {
            if(hasMoreProfessions) {
                setProfessionsPage(prevPage => prevPage + 1);
            }
        }
    };
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedCitySearch(citySearch);
            setCities([]);
            setCitiesPage(1);
            setHasMoreCities(true);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [citySearch]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!hasMoreCities) return;
            if (debouncedCitySearch.length > 0 && debouncedCitySearch.length < 2) return;

            try {
                const response = await fetch(`/api/bff/api/filter/cities?page=${citiesPage}&search=${debouncedCitySearch}&per_page=25`);
                const data = await response.json();

                if (data && Array.isArray(data.data)) {
                    setCities(prev => citiesPage === 1 ? data.data : [...prev, ...data.data]);
                    setHasMoreCities(data.next_page_url !== null);
                } else {
                    setHasMoreCities(false);
                }
            } catch (error) {
                console.error("Failed to fetch cities:", error);
                setHasMoreCities(false);
            }
        };
        fetchCities();
    }, [citiesPage, debouncedCitySearch, hasMoreCities]);

    const handleCitiesScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 200) {
            if(hasMoreCities) {
                setCitiesPage(prevPage => prevPage + 1);
            }
        }
    };

    const handleExperiencesScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 200) {
            if(hasMoreExperiences) {
                setExperiencesPage(prevPage => prevPage + 1);
            }
        }
    };

    const renderCategories = (nodes: any[]) => {
        return nodes.map(node => (
            <li key={node.id}>
                <input
                    type="checkbox"
                    id={`cat-${node.id}`}
                    onChange={() => handleFilterChange('categories', node)}
                    checked={filters.categories?.includes(node.id)}
                />
                <label htmlFor={`cat-${node.id}`}>{node.title?.az || node.title}</label>
                {node.subs && node.subs.length > 0 && (
                    <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                        {renderCategories(node.subs)}
                    </ul>
                )}
            </li>
        ));
    };

    const handleEmploymentTypesScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 200) {
            if(hasMoreEmploymentTypes) {
                setEmploymentTypesPage(prevPage => prevPage + 1);
            }
        }
    };

    const filteredCategories = useMemo(() => {
        const filterNodes = (nodes: any[], search: string): any[] => {
            if (!search) return nodes;
            return nodes.reduce((acc: any[], node) => {
                const children = node.subs ? filterNodes(node.subs, search) : [];
                if ((node.title?.az || node.title).toLowerCase().includes(search.toLowerCase()) || children.length > 0) {
                    acc.push({ ...node, subs: children });
                }
                return acc;
            }, []);
        };
        return filterNodes(availableCategories, categorySearch);
    }, [availableCategories, categorySearch]);

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleClearFilters = () => {
        setFilters(initialFilters);
        onSearch(initialFilters);
        setCategorySearch('');
        setEmploymentTypeSearch('');
        setExperienceSearch('');
        setProfessionSearch('');
        setCitySearch('');
    };

    const renderFilters = () => {
        const filterItems = [
            {
                title: 'Məşğulluq növü',
                searchPlaceholder: 'Məşğulluq növü axtar',
                searchValue: employmentTypeSearch,
                onSearchChange: setEmploymentTypeSearch,
                onScroll: handleEmploymentTypesScroll,
                items: availableEmploymentTypes,
                filterCategory: 'employmentType',
                renderItem: (item: any) => (
                    <>
                        <input type="checkbox" id={`type-${item.id}`} onChange={() => handleFilterChange('employmentType', item.id)} checked={filters.employmentType?.includes(item.id)} />
                        <label htmlFor={`type-${item.id}`}>{item.title?.az || item.title}</label>
                    </>
                )
            },
            {
                title: 'İş kateqoriyaları',
                searchPlaceholder: 'İş kateqoriyasını axtar',
                searchValue: categorySearch,
                onSearchChange: setCategorySearch,
                items: filteredCategories,
                filterCategory: 'categories',
                customRender: () => (
                    <div className="checkbox-list-wrapper categories-wrapper">
                        <ul className="filter-list checkbox-list">
                            {renderCategories(filteredCategories)}
                        </ul>
                    </div>
                )
            },
            {
                title: 'İxtisas',
                searchPlaceholder: 'İxtisas axtar',
                searchValue: professionSearch,
                onSearchChange: setProfessionSearch,
                onScroll: handleProfessionsScroll,
                items: professions,
                filterCategory: 'professions',
                renderItem: (item: any) => (
                    <>
                        <input type="checkbox" id={`prof-${item.id}`} onChange={() => handleFilterChange('professions', item.id)} checked={filters.professions?.includes(item.id)} />
                        <label htmlFor={`prof-${item.id}`}>{item.title}</label>
                    </>
                )
            },
            {
                title: 'Təcrübə',
                searchPlaceholder: 'Təcrübə axtar',
                searchValue: experienceSearch,
                onSearchChange: setExperienceSearch,
                onScroll: handleExperiencesScroll,
                items: availableExperiences,
                filterCategory: 'experience',
                renderItem: (item: any) => (
                    <>
                        <input type="checkbox" id={`exp-${item.id}`} onChange={() => handleFilterChange('experience', item.id)} checked={filters.experience?.includes(item.id)} />
                        <label htmlFor={`exp-${item.id}`}>{item.title.az}{!isNaN(parseInt(item.title.az)) ? ' il' : ''}</label>
                    </>
                )
            },
            {
                title: 'Şəhər',
                searchPlaceholder: 'Şəhər axtar',
                searchValue: citySearch,
                onSearchChange: setCitySearch,
                onScroll: handleCitiesScroll,
                items: cities,
                filterCategory: 'cities',
                renderItem: (item: any) => (
                    <>
                        <input type="checkbox" id={`city-${item.id}`} onChange={() => handleFilterChange('cities', item.id)} checked={filters.cities?.includes(item.id)} />
                        <label htmlFor={`city-${item.id}`}>{item.title.az}</label>
                    </>
                )
            },
            {
                title: 'Maaş',
                customRender: () => (
                    <div className="salary-filter">
                        <div className="salary-slider">
                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="slider-thumb"
                                trackClassName="slider-track"
                                value={[filters.minSalary || 0, filters.maxSalary || 5000]}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                renderThumb={({ key, ...props }, state) => <div key={key} {...props}>{state.valueNow}</div>}
                                pearling
                                minDistance={100}
                                onChange={(value) => {
                                    setFilters((prev: any) => ({ ...prev, minSalary: value[0], maxSalary: value[1] }))
                                }}
                                min={0}
                                max={5000}
                            />
                        </div>
                        <div className="salary-type">
                            <input type="radio" id="net" name="salaryType" value="net" onChange={(e) => setFilters((prev: any) => ({ ...prev, salaryType: e.target.value }))} checked={filters.salaryType === 'net'} />
                            <label htmlFor="net">Net</label>
                            <input type="radio" id="gross" name="salaryType" value="gross" onChange={(e) => setFilters((prev: any) => ({ ...prev, salaryType: e.target.value }))} checked={filters.salaryType === 'gross'} />
                            <label htmlFor="gross">Gross</label>
                        </div>
                    </div>
                )
            }
        ];

        return filterItems.map((filter, index) => {
            const content = filter.customRender ? filter.customRender() : (
                <>
                    <input
                        type="text"
                        placeholder={filter.searchPlaceholder}
                        className="filter-search-input"
                        value={filter.searchValue}
                        onChange={(e) => filter.onSearchChange(e.target.value)}
                    />
                    <div className="checkbox-list-wrapper" onScroll={filter.onScroll}>
                        <ul className="filter-list checkbox-list">
                            {filter.items.map((item: any) => (
                                <li key={item.id}>
                                    {filter.renderItem && filter.renderItem(item)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            );

            const wrapperClass = layout === 'grid' ? 'col-md-4' : '';

            return (
                <div key={index} className={wrapperClass}>
                    <div className="filter-widget">
                        <details open>
                            <summary>{filter.title}</summary>
                            {content}
                        </details>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="filter-sidebar-inner" style={layout === 'grid' ? { padding: '20px' } : {}}>
            <div className={layout === 'grid' ? 'row' : ''}>
                {renderFilters()}
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="filter-buttons" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="button gray clear-button" onClick={handleClearFilters}>Təmizlə</button>
                        <button className="button search-button" onClick={handleSearch}>Axtar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
