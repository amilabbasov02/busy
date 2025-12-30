"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Select from "react-select";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

type Option = { value: number; label: string };

const JobseekersV2Page = () => {
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(true);

  const [cities, setCities] = useState<Option[]>([]);
  const [professions, setProfessions] = useState<Option[]>([]);
  const [skills, setSkills] = useState<Option[]>([]);

  const [selectedCities, setSelectedCities] = useState<Option[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<Option[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  const [cityPage, setCityPage] = useState(1);
  const [professionPage, setProfessionPage] = useState(1);
  const [skillPage, setSkillPage] = useState(1);

  const [hasMoreCities, setHasMoreCities] = useState(true);
  const [hasMoreProfessions, setHasMoreProfessions] = useState(true);
  const [hasMoreSkills, setHasMoreSkills] = useState(true);

  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isProfessionsLoading, setIsProfessionsLoading] = useState(false);
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);

  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [professionSearchTerm, setProfessionSearchTerm] = useState("");
  const [skillSearchTerm, setSkillSearchTerm] = useState("");

  const [jobseekers, setJobseekers] = useState<any[]>([]);
  const [isLoadingJobseekers, setIsLoadingJobseekers] = useState(false);
  const [jobseekersPage, setJobseekersPage] = useState(1);
  const [hasMoreJobseekers, setHasMoreJobseekers] = useState(true);

  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");
  const [minimumAge, setMinimumAge] = useState("");
  const [maximumAge, setMaximumAge] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");

  // Son axtarışın URL-i (Load more bununla davam edəcək)
  const [lastJobseekersUrl, setLastJobseekersUrl] = useState<string>("");

  // Next/Image fallback üçün
  const [brokenAvatars, setBrokenAvatars] = useState<Record<number, boolean>>(
    {}
  );

  const accordionBodyRef = useRef<HTMLDivElement>(null);

  const toggleAdvancedSearch = () => setIsAdvancedSearchOpen((v) => !v);

  const normalizeTitle = (item: any) => {
    if (!item?.title) return "";
    return typeof item.title === "string" ? item.title : item.title?.az ?? "";
  };

  // =========================
  // JOBSEEKERS URL BUILDER
  // =========================
  const buildJobseekersUrl = useCallback(
    (page = 1) => {
      const params = new URLSearchParams();

      if (keywordSearch.trim()) params.set("keyword", keywordSearch.trim());
      if (minimumAge) params.set("minimum_age", minimumAge);
      if (maximumAge) params.set("maximum_age", maximumAge);
      if (gender !== "") params.set("gender", gender);
      if (photo !== "") params.set("photo", photo);

      selectedCities.forEach((c) => params.append("cities[]", String(c.value)));
      selectedProfessions.forEach((p) =>
        params.append("professions[]", String(p.value))
      );
      selectedSkills.forEach((s) => params.append("skills[]", String(s.value)));

      params.set("page", String(page));

      const url = `/api/bff/api/jobseekers?${params.toString()}`;
      return { url, params };
    },
    [
      keywordSearch,
      minimumAge,
      maximumAge,
      gender,
      photo,
      selectedCities,
      selectedProfessions,
      selectedSkills,
    ]
  );

  // =========================
  // Cities search
  // =========================
  const searchCities = useCallback(async (searchTerm: string, page = 1) => {
    if (searchTerm.length < 4) return;

    setIsCitiesLoading(true);
    try {
      const url = `/api/bff/api/filter/cities?page=${page}&search=${encodeURIComponent(
        searchTerm
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (page === 1) {
        setCities(
          (data?.data ?? []).map((c: any) => ({
            value: c.id,
            label: normalizeTitle(c),
          }))
        );
        setCityPage(1);
        setHasMoreCities(
          data?.current_page <
            Math.ceil((data?.count ?? 0) / (data?.per_page ?? 1))
        );
      }
    } catch (e) {
      console.error("Failed to search cities", e);
    } finally {
      setIsCitiesLoading(false);
    }
  }, []);

  const loadMoreCities = async () => {
    if (isCitiesLoading || !hasMoreCities) return;

    setIsCitiesLoading(true);
    const nextPage = cityPage + 1;

    try {
      const url =
        citySearchTerm.length >= 4
          ? `/api/bff/api/filter/cities?page=${nextPage}&search=${encodeURIComponent(
              citySearchTerm
            )}`
          : `/api/bff/api/filter/cities?page=${nextPage}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data?.data?.length) {
        setCities((prev) => [
          ...prev,
          ...data.data.map((c: any) => ({
            value: c.id,
            label: normalizeTitle(c),
          })),
        ]);
        setCityPage(nextPage);
      }

      if (
        !data?.data?.length ||
        data.current_page >= Math.ceil(data.count / data.per_page)
      ) {
        setHasMoreCities(false);
      }
    } catch (e) {
      console.error("Failed to load more cities", e);
    } finally {
      setIsCitiesLoading(false);
    }
  };

  // =========================
  // Professions search
  // =========================
  const searchProfessions = useCallback(async (searchTerm: string, page = 1) => {
    if (searchTerm.length < 4) return;

    setIsProfessionsLoading(true);
    try {
      const url = `/api/bff/api/filter/professions?page=${page}&search=${encodeURIComponent(
        searchTerm
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (page === 1) {
        setProfessions(
          (data?.data ?? []).map((p: any) => ({
            value: p.id,
            label: p.title,
          }))
        );
        setProfessionPage(1);
        setHasMoreProfessions(
          data?.current_page <
            Math.ceil((data?.count ?? 0) / (data?.per_page ?? 1))
        );
      }
    } catch (e) {
      console.error("Failed to search professions", e);
    } finally {
      setIsProfessionsLoading(false);
    }
  }, []);

  const loadMoreProfessions = async () => {
    if (isProfessionsLoading || !hasMoreProfessions) return;

    setIsProfessionsLoading(true);
    const nextPage = professionPage + 1;

    try {
      const url =
        professionSearchTerm.length >= 4
          ? `/api/bff/api/filter/professions?page=${nextPage}&search=${encodeURIComponent(
              professionSearchTerm
            )}`
          : `/api/bff/api/filter/professions?page=${nextPage}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data?.data?.length) {
        setProfessions((prev) => [
          ...prev,
          ...data.data.map((p: any) => ({
            value: p.id,
            label: p.title,
          })),
        ]);
        setProfessionPage(nextPage);
      }

      if (
        !data?.data?.length ||
        data.current_page >= Math.ceil(data.count / data.per_page)
      ) {
        setHasMoreProfessions(false);
      }
    } catch (e) {
      console.error("Failed to load more professions", e);
    } finally {
      setIsProfessionsLoading(false);
    }
  };

  // =========================
  // Skills search
  // =========================
  const searchSkills = useCallback(async (searchTerm: string, page = 1) => {
    if (searchTerm.length < 4) return;

    setIsSkillsLoading(true);
    try {
      const url = `/api/bff/api/filter/skills?page=${page}&search=${encodeURIComponent(
        searchTerm
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (page === 1) {
        setSkills(
          (data?.data ?? []).map((s: any) => ({
            value: s.id,
            label: s.title,
          }))
        );
        setSkillPage(1);
        setHasMoreSkills(
          data?.current_page <
            Math.ceil((data?.count ?? 0) / (data?.per_page ?? 1))
        );
      }
    } catch (e) {
      console.error("Failed to search skills", e);
    } finally {
      setIsSkillsLoading(false);
    }
  }, []);

  const loadMoreSkills = async () => {
    if (isSkillsLoading || !hasMoreSkills) return;

    setIsSkillsLoading(true);
    const nextPage = skillPage + 1;

    try {
      const url =
        skillSearchTerm.length >= 4
          ? `/api/bff/api/filter/skills?page=${nextPage}&search=${encodeURIComponent(
              skillSearchTerm
            )}`
          : `/api/bff/api/filter/skills?page=${nextPage}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data?.data?.length) {
        setSkills((prev) => [
          ...prev,
          ...data.data.map((s: any) => ({
            value: s.id,
            label: s.title,
          })),
        ]);
        setSkillPage(nextPage);
      }

      if (
        !data?.data?.length ||
        data.current_page >= Math.ceil(data.count / data.per_page)
      ) {
        setHasMoreSkills(false);
      }
    } catch (e) {
      console.error("Failed to load more skills", e);
    } finally {
      setIsSkillsLoading(false);
    }
  };

  const fetchInitialCities = async () => {
    try {
      setIsCitiesLoading(true);
      const res = await fetch(`/api/bff/api/filter/cities?page=1`);
      const data = await res.json();

      setCities(
        (data?.data ?? []).map((c: any) => ({
          value: c.id,
          label: normalizeTitle(c),
        }))
      );

      if (data?.current_page >= Math.ceil(data.count / data.per_page)) {
        setHasMoreCities(false);
      }
    } catch (e) {
      console.error("Failed to fetch cities", e);
    } finally {
      setIsCitiesLoading(false);
    }
  };

  const fetchInitialProfessions = async () => {
    try {
      setIsProfessionsLoading(true);
      const res = await fetch(`/api/bff/api/filter/professions?page=1`);
      const data = await res.json();

      setProfessions(
        (data?.data ?? []).map((p: any) => ({
          value: p.id,
          label: p.title,
        }))
      );

      if (data?.current_page >= Math.ceil(data.count / data.per_page)) {
        setHasMoreProfessions(false);
      }
    } catch (e) {
      console.error("Failed to fetch professions", e);
    } finally {
      setIsProfessionsLoading(false);
    }
  };

  const fetchInitialSkills = async () => {
    try {
      setIsSkillsLoading(true);
      const res = await fetch(`/api/bff/api/filter/skills?page=1`);
      const data = await res.json();

      setSkills(
        (data?.data ?? []).map((s: any) => ({
          value: s.id,
          label: s.title,
        }))
      );

      if (data?.current_page >= Math.ceil(data.count / data.per_page)) {
        setHasMoreSkills(false);
      }
    } catch (e) {
      console.error("Failed to fetch skills", e);
    } finally {
      setIsSkillsLoading(false);
    }
  };

  // =========================
  // Jobseekers fetch (uses last filters)
  // =========================
  const fetchJobseekers = async (page = 1, append = false) => {
    setIsLoadingJobseekers(true);

    try {
      const urlToUse =
        lastJobseekersUrl && page > 1
          ? lastJobseekersUrl.replace(/([?&])page=\d+/g, `$1page=${page}`)
          : buildJobseekersUrl(page).url;

      const response = await fetch(urlToUse);
      const data = await response.json();

      const list = data?.data ?? [];

      if (list.length) {
        setJobseekers((prev) => (append ? [...prev, ...list] : list));
        setJobseekersPage(page);

        const currentPage = data.current_page || page;
        const perPage = data.per_page || 35;
        const totalPages = Math.ceil((data.count ?? 0) / perPage);
        setHasMoreJobseekers(currentPage < totalPages);
      } else {
        if (!append) setJobseekers([]);
        setHasMoreJobseekers(false);
      }
    } catch (error) {
      console.error("Failed to fetch jobseekers:", error);
    } finally {
      setIsLoadingJobseekers(false);
    }
  };

  // =========================
  // SUBMIT (LOG + SEARCH)
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { url, params } = buildJobseekersUrl(1);
    setLastJobseekersUrl(url);

    console.group("🔎 Jobseekers Search");
    console.log("URL:", url);
    console.log("Params:", Object.fromEntries(params.entries()));
    console.log("Selected IDs:", {
      cities: selectedCities.map((x) => x.value),
      professions: selectedProfessions.map((x) => x.value),
      skills: selectedSkills.map((x) => x.value),
    });
    console.groupEnd();

    await fetchJobseekers(1, false);
  };

  // react-select input change handler-ləri
  const handleCityInputChange = useCallback(
    (inputValue: string) => {
      setCitySearchTerm(inputValue);
      if (inputValue.length >= 4) searchCities(inputValue);
      if (inputValue.length === 0) {
        setCityPage(1);
        setHasMoreCities(true);
        fetchInitialCities();
      }
      return inputValue;
    },
    [searchCities]
  );

  const handleProfessionInputChange = useCallback(
    (inputValue: string) => {
      setProfessionSearchTerm(inputValue);
      if (inputValue.length >= 4) searchProfessions(inputValue);
      if (inputValue.length === 0) {
        setProfessionPage(1);
        setHasMoreProfessions(true);
        fetchInitialProfessions();
      }
      return inputValue;
    },
    [searchProfessions]
  );

  const handleSkillInputChange = useCallback(
    (inputValue: string) => {
      setSkillSearchTerm(inputValue);
      if (inputValue.length >= 4) searchSkills(inputValue);
      if (inputValue.length === 0) {
        setSkillPage(1);
        setHasMoreSkills(true);
        fetchInitialSkills();
      }
      return inputValue;
    },
    [searchSkills]
  );

  useEffect(() => {
    const accordionBody = accordionBodyRef.current;
    if (!accordionBody) return;
    accordionBody.style.display = isAdvancedSearchOpen ? "block" : "none";
  }, [isAdvancedSearchOpen]);

  useEffect(() => {
    fetchInitialCities();
    fetchInitialProfessions();
    fetchInitialSkills();

    // ilkin load: filtersiz
    const initialUrl = `/api/bff/api/jobseekers?page=1`;
    setLastJobseekersUrl(initialUrl);
    fetchJobseekers(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div
            className={`${styles.accordion_panel} ${
              isAdvancedSearchOpen ? styles.accordion_expanded : ""
            }`}
          >
            <h1 className={styles.jobseeker_head}>İşaxtaranlar</h1>

            <h2
              className={styles.accordion_header}
              onClick={toggleAdvancedSearch}
            >
              <span>
                <i className="fas fa-search"></i>&nbsp;Ətraflı axtarış
              </span>
              <span className={styles.arrowIcon}>
                <i
                  className={`fas ${
                    isAdvancedSearchOpen ? "fa-caret-up" : "fa-caret-down"
                  }`}
                ></i>
              </span>
            </h2>

            <div
              className={styles.accordion_body}
              id="accordion-body"
              ref={accordionBodyRef}
            >
              <form onSubmit={handleSubmit} className={styles.adv_search_form}>
                <div className={styles.form_row}>
                  <div
                    className={`${styles.form_group} ${styles.form_group_selectable}`}
                  >
                    <label htmlFor="keyword">Açar-kəlmələr ilə axtarış</label>
                    <input
                      id="keyword"
                      type="text"
                      name="keyword"
                      value={keywordSearch}
                      onChange={(e) => setKeywordSearch(e.target.value)}
                      placeholder="axtar"
                    />
                  </div>

                  <div
                    className={`${styles.form_group} ${styles.form_group_selectable}`}
                  >
                    <label htmlFor="minimum_age">Minimum Yaş</label>
                    <input
                      id="minimum_age"
                      type="number"
                      min="15"
                      max="70"
                      name="minimum_age"
                      value={minimumAge}
                      onChange={(e) => setMinimumAge(e.target.value)}
                    />
                  </div>

                  <div
                    className={`${styles.form_group} ${styles.form_group_selectable}`}
                  >
                    <label htmlFor="maximum_age">Maksimum Yaş</label>
                    <input
                      id="maximum_age"
                      type="number"
                      min="15"
                      max="70"
                      name="maximum_age"
                      value={maximumAge}
                      onChange={(e) => setMaximumAge(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.form_row}>
                  <div className={styles.form_group}>
                    <label htmlFor="cities">Bölgə</label>
                    <Select
                      id="cities"
                      name="cities[]"
                      isMulti
                      options={cities}
                      value={selectedCities}
                      onChange={(v) => setSelectedCities(v as any)}
                      onInputChange={handleCityInputChange}
                      onMenuScrollToBottom={loadMoreCities}
                      isLoading={isCitiesLoading}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder="Şəhər seçin..."
                      noOptionsMessage={() =>
                        citySearchTerm.length < 4
                          ? "4 və ya daha çox simvol yazın"
                          : "Nəticə tapılmadı"
                      }
                      loadingMessage={() => "Yüklənir..."}
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="gender">Cins</label>
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Seçilməyib</option>
                      <option value="1">Kişi</option>
                      <option value="2">Qadın</option>
                    </select>
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="photo">Yalnız Şəkilli</label>
                    <select
                      id="photo"
                      name="photo"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    >
                      <option value="">Seçilməyib</option>
                      <option value="1">Var</option>
                      <option value="0">Yoxdur</option>
                    </select>
                  </div>
                </div>

                <div className={`${styles.form_group_full} selectable_input`}>
                  <label htmlFor="professions">İxtisasa görə filterləri</label>
                  <Select
                    id="professions"
                    name="professions[]"
                    isMulti
                    options={professions}
                    value={selectedProfessions}
                    onChange={(v) => setSelectedProfessions(v as any)}
                    onInputChange={handleProfessionInputChange}
                    onMenuScrollToBottom={loadMoreProfessions}
                    isLoading={isProfessionsLoading}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="İxtisas seçin..."
                    noOptionsMessage={() =>
                      professionSearchTerm.length < 4
                        ? "4 və ya daha çox simvol yazın"
                        : "Nəticə tapılmadı"
                    }
                    loadingMessage={() => "Yüklənir..."}
                  />
                </div>

                {/* Skills select istəyirsənsə buraya əlavə edərik, data/logic hazırdı (skills, selectedSkills, loadMoreSkills, handleSkillInputChange) */}

                <div className={styles.form_row}>
                  <button type="submit" className={styles.submitInput}>
                    Axtar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Jobseekers Grid - Container dışında */}
        <section className={styles.jobseekersGrid}>
          {isLoadingJobseekers && jobseekers.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <p>Yüklənir...</p>
            </div>
          ) : jobseekers.length > 0 ? (
            jobseekers.map((seeker) => {
              const fullName =
                `${seeker.name || ""} ${seeker.last_name || ""}`.trim() ||
                "İsimsiz";

              const professionTitles =
                seeker.desired_jobs
                  ?.filter((job: any) => job.profession)
                  .map((job: any) => job.profession.title)
                  .filter(
                    (title: string, i: number, arr: string[]) =>
                      arr.indexOf(title) === i
                  ) || [];

              const avatarSrc =
                brokenAvatars[seeker.id] || !seeker.avatar
                  ? "/images/user-avatar-placeholder.png"
                  : seeker.avatar;

              return (
                <Link
                  href={`/jobseekers_v2/${seeker.id}`}
                  key={seeker.id}
                  className={styles.profileCard}
                >
                  <div className={styles.cardHeader}>
                    <Image
                      src={avatarSrc}
                      alt={fullName}
                      width={80}
                      height={80}
                      className={styles.profilePhoto}
                      onError={() =>
                        setBrokenAvatars((prev) => ({
                          ...prev,
                          [seeker.id]: true,
                        }))
                      }
                      unoptimized
                    />
                    <div className={styles.headerText}>
                      <h3 className={styles.profileName}>{fullName}</h3>
                      <p className={styles.profilePosition}>
                        {professionTitles.length > 0
                          ? professionTitles.slice(0, 2).join(", ") +
                            (professionTitles.length > 2 ? "..." : "")
                          : "Vəzifə qeyd edilməyib"}
                      </p>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    {professionTitles.length > 0 && (
                      <div className={styles.skills}>
                        {professionTitles.map((p: string, i: number) => (
                          <span key={i} className={styles.skillTag}>
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <p>Heç bir işaxtaran tapılmadı</p>
            </div>
          )}
        </section>

        {/* Load More Button - Container dışında */}
        {hasMoreJobseekers && !isLoadingJobseekers && jobseekers.length > 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <button
              onClick={() => fetchJobseekers(jobseekersPage + 1, true)}
              className={styles.submitInput}
              style={{ padding: "12px 40px" }}
            >
              Daha çox yüklə
            </button>
          </div>
        )}

        {isLoadingJobseekers && jobseekers.length > 0 && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Yüklənir...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobseekersV2Page;
