"use client";
import ReactSlider from "react-slider";
import { useEffect, useState, Suspense, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  logo: string;
  isPremium: boolean;
  href: string;
  employmentType: string;
  category: string;
  salary: number;
  salaryType: "net" | "gross";
  jobField: string;
}

const allVacancies: Vacancy[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Vakansiya Başlığı ${i + 1}`,
  company: `Şirkət ${i + 1}`,
  location: "Bakı",
  time: `${(i % 5) + 1} gün əvvəl`,
  logo: "/images/company-logo-placeholder.png",
  isPremium: i % 4 === 0,
  href: "#",
  employmentType: [
    "Tam iş günü",
    "Yarım iş günü",
    "Distant",
    "Sərbəst",
    "Təcrübə",
    "Müvəqqəti",
    "Könüllü",
    "Hibrid",
    "Növbəli",
  ][i % 9],
  category: [
    "İnzibati",
    "Maliyyə",
    "IT",
    "Tibb və Əczaçılıq",
    "Sənaye və istehsalat",
    "Turizm və restoran",
    "Hüquq",
    "Marketinq",
    "Satış",
  ][i % 9],
  salary: 1000 + i * 100,
  salaryType: i % 2 === 0 ? "net" : "gross",
  jobField: ["Texnologiya", "Marketinq", "Satış", "Dizayn", "Maliyyə"][i % 5],
}));

const fetchVacancies = (
  page: number,
  filters: any,
  itemsPerPage: number = 10
): Promise<{ vacancies: Vacancy[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = allVacancies.filter((v) => {
        if (
          filters.employmentType?.length > 0 &&
          !filters.employmentType.includes(v.employmentType)
        )
          return false;
        if (filters.category?.length > 0 && !filters.category.includes(v.category))
          return false;
        if (filters.jobField?.length > 0 && !filters.jobField.includes(v.jobField))
          return false;
        if (filters.company?.length > 0 && !filters.company.includes(v.company))
          return false;
        if (filters.minSalary && v.salary < filters.minSalary) return false;
        if (filters.maxSalary && v.salary > filters.maxSalary) return false;
        if (filters.salaryType && v.salaryType !== filters.salaryType) return false;
        const positionMatch =
          filters.position?.length > 0
            ? filters.position.some(
                (p: string) =>
                  v.title.toLowerCase().includes(p.toLowerCase()) ||
                  v.company.toLowerCase().includes(p.toLowerCase())
              )
            : true;
        const locationMatch =
          filters.location?.length > 0
            ? filters.location.some((l: string) =>
                v.location.toLowerCase().includes(l.toLowerCase())
              )
            : true;
        if (!positionMatch || !locationMatch) return false;
        return true;
      });
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      resolve({
        vacancies: filtered.slice(start, end),
        total: filtered.length,
      });
    }, 300);
  });
};

function VacanciesV2Content({ searchFilters }: { searchFilters: any }) {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({
    employmentType: [],
    category: [],
    minSalary: "",
    maxSalary: "",
    salaryType: "",
    jobField: [],
    company: [],
    ...searchFilters,
  });
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = parseInt(page, 10);

  const [availableEmploymentTypes, setAvailableEmploymentTypes] = useState<
    string[]
  >([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableJobFields, setAvailableJobFields] = useState<string[]>([]);
  const [availableCompanies, setAvailableCompanies] = useState<string[]>([]);

  const handleFilterChange = (category: string, value: any) => {
    setFilters((prevFilters: any) => ({ ...prevFilters, [category]: value }));
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prevFilters: any) => {
      const currentCategoryFilters = prevFilters[category] || [];
      const newCategoryFilters = currentCategoryFilters.includes(value)
        ? currentCategoryFilters.filter((item: string) => item !== value)
        : [...currentCategoryFilters, value];
      return { ...prevFilters, [category]: newCategoryFilters };
    });
  };

  useEffect(() => {
    setFilters((prevFilters: any) => ({ ...prevFilters, ...searchFilters }));
  }, [searchFilters]);

  useEffect(() => {
    const getUniqueValues = (key: keyof Vacancy) =>
      [...new Set(allVacancies.map((v) => v[key]))] as string[];
    setAvailableEmploymentTypes(getUniqueValues("employmentType"));
    setAvailableCategories(getUniqueValues("category"));
    setAvailableJobFields(getUniqueValues("jobField"));
    setAvailableCompanies(getUniqueValues("company"));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchVacancies(currentPage, filters).then((result) => {
      setVacancies(result.vacancies);
      setTotalPages(Math.ceil(result.total / 10));
      setLoading(false);
    });
  }, [currentPage, filters]);

  return (
    <div className="container page-content">
      <button
        className="filter-toggle-button"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <i className="icon-feather-filter"></i> Filterlər
      </button>
      <div className="main-layout">
        <div className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
          <div className="filter-sidebar-inner">
            <button
              className="filter-close-button"
              onClick={() => setIsFilterOpen(false)}
            >
              &times;
            </button>
            <h3>Filterlər</h3>
            <div className="filter-widget">
              <details open>
                <summary>Məşğulluq növü</summary>
                <div className="checkbox-list-wrapper">
                  <ul className="filter-list checkbox-list">
                    {availableEmploymentTypes.map((type, index) => (
                      <li key={type}>
                        <input
                          type="checkbox"
                          id={`type${index}`}
                          onChange={() =>
                            handleCheckboxChange("employmentType", type)
                          }
                          checked={filters.employmentType.includes(type)}
                        />
                        <label htmlFor={`type${index}`}>{type}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className="job-listings">
          {loading ? (
            <p>Yüklənir...</p>
          ) : (
            vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className={`job-card ${vacancy.isPremium ? "premium" : ""}`}
              >
                {vacancy.isPremium && (
                  <div className="premium-badge">Premium</div>
                )}
                <div className="job-card-header">
                  <img src={vacancy.logo} alt={`${vacancy.company} logo`} />
                  <div className="job-card-title">
                    <h3>
                      <Link href={vacancy.href}>{vacancy.title}</Link>
                    </h3>
                    <p>{vacancy.company}</p>
                  </div>
                </div>
                <div className="job-card-details">
                  <span>
                    <i className="icon-material-outline-location-on"></i>{" "}
                    {vacancy.location}
                  </span>
                  <span>
                    <i className="icon-material-outline-access-time"></i>{" "}
                    {vacancy.time}
                  </span>
                </div>
                <Link
                  href={vacancy.href}
                  className="button button-sliding-icon"
                >
                  Ətraflı{" "}
                  <i className="icon-material-outline-arrow-right-alt"></i>
                </Link>
              </div>
            ))
          )}

          <div className="pagination-container">
            <nav className="pagination">
              <ul>
                {currentPage > 1 && (
                  <li className="pagination-arrow">
                    <Link href={`/vacancies_v2?page=${currentPage - 1}`}>
                      <i className="icon-material-outline-keyboard-arrow-left"></i>
                    </Link>
                  </li>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p}>
                    <Link
                      href={`/vacancies_v2?page=${p}`}
                      className={currentPage === p ? "current-page" : ""}
                    >
                      {p}
                    </Link>
                  </li>
                ))}
                {currentPage < totalPages && (
                  <li className="pagination-arrow">
                    <Link href={`/vacancies_v2?page=${currentPage + 1}`}>
                      <i className="icon-material-outline-keyboard-arrow-right"></i>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VacanciesV2() {
  const [positionValue, setPositionValue] = useState<string[]>([]);
  const [locationValue, setLocationValue] = useState<string[]>(["Azərbaycan"]);
  const [positionInputValue, setPositionInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<{
    position: string[];
    location: string[];
  }>({ position: [], location: ["Azərbaycan"] });

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Project Manager",
    "UI/UX Designer",
  ];
  const locations = ["Azərbaycan", "Bakı", "Sumqayıt", "Gəncə", "Mingəçevir"];

  const positionRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (positionRef.current && !positionRef.current.contains(event.target as Node)) {
        setIsPositionDropdownOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePositionSelect = (pos: string) => {
    setPositionValue((prev) => {
      const newValues = prev.includes(pos)
        ? prev.filter((p) => p !== pos)
        : [...prev, pos];
      setSearchFilters((f) => ({ ...f, position: newValues }));
      return newValues;
    });
    setPositionInputValue("");
  };

  const handleLocationSelect = (loc: string) => {
    setLocationValue((prev) => {
      const newValues = prev.includes(loc)
        ? prev.filter((l) => l !== loc)
        : [...prev, loc];
      setSearchFilters((f) => ({ ...f, location: newValues }));
      return newValues;
    });
    setLocationInputValue("");
  };

  const handleSearch = () => {
    setSearchFilters({ position: positionValue, location: locationValue });
  };

  return (
    <>
      <Head>
        <title>Vakansiyalar | İş elanları</title>
        <link rel="stylesheet" href="https://unpkg.com/inter-ui/inter.css" />
      </Head>

      <div className="job-search-portal">
        <div className="hero-section">
          <div className="container">
            <h1>Sənin üçün ən yaxşı işi tap</h1>
            <p>Azərbaycanda minlərlə iş elanı arasında axtarış et</p>
            <div className="search-form">
              {/* Position input */}
              <div
                className="search-input-wrapper"
                ref={positionRef}
                style={{ flexGrow: 2, marginRight: "15px" }}
              >
                <input
                  type="text"
                  placeholder="Vəzifə adı və ya açar söz"
                  value={
                    positionInputValue.length > 0
                      ? positionInputValue
                      : positionValue.join(", ")
                  }
                  onChange={(e) => {
                    setPositionInputValue(e.target.value);
                    setIsPositionDropdownOpen(true);
                  }}
                  onFocus={() => setIsPositionDropdownOpen(true)}
                />
                {isPositionDropdownOpen && (
                  <div className="search-dropdown">
                    <ul>
                      {positions
                        .filter((p) =>
                          p.toLowerCase().includes(positionInputValue.toLowerCase())
                        )
                        .map((pos) => (
                          <li key={pos} onMouseDown={() => handlePositionSelect(pos)}>
                            <input
                              type="checkbox"
                              checked={positionValue.includes(pos)}
                              readOnly
                              style={{ marginRight: "10px" }}
                            />
                            {pos}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Location input */}
              <div
                className="search-input-wrapper"
                ref={locationRef}
                style={{ flexGrow: 2, marginRight: "15px" }}
              >
                <input
                  type="text"
                  placeholder="Şəhər və ya rayon"
                  value={
                    locationInputValue.length > 0
                      ? locationInputValue
                      : locationValue.join(", ")
                  }
                  onChange={(e) => {
                    setLocationInputValue(e.target.value);
                    setIsLocationDropdownOpen(true);
                  }}
                  onFocus={() => setIsLocationDropdownOpen(true)}
                />
                {isLocationDropdownOpen && (
                  <div className="search-dropdown">
                    <ul>
                      {locations
                        .filter((l) =>
                          l.toLowerCase().includes(locationInputValue.toLowerCase())
                        )
                        .map((loc) => (
                          <li key={loc} onMouseDown={() => handleLocationSelect(loc)}>
                            <input
                              type="checkbox"
                              checked={locationValue.includes(loc)}
                              readOnly
                              style={{ marginRight: "10px" }}
                            />
                            {loc}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              <button className="button" onClick={handleSearch}>
                Axtar
              </button>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="container"><p>Yüklənir...</p></div>}>
          <VacanciesV2Content searchFilters={searchFilters} />
        </Suspense>
      </div>
    </>
  );
}
