import { Metadata } from 'next';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';
import VacancyClient from './VacancyClient';

interface VacancyDetailsPage {
  id: number;
  job_title: string;
  slug: string;
  content?: { content?: string };
  company?: { id: number; title: string; logo: string; slug: string };
  city_rels?: { city: { id: number; title: { az: string } } }[];
  professions?: { profession: { id: number; title: string; slug: string } }[];
  category?: { title?: { az?: string } };
  email?: string;
  is_prime?: number;
}

// VacancyClient expects a more complete shape. To keep types happy (and tolerant to API changes),
// we loosen the typing at the boundary.
type VacancyClientShape = any;

const upstreamHost = 'https://api.busy.az';

const fetchJson = async (url: string) => {
  const res = await cachedFetchUpstream(url);
  if (!res.ok) return null;
  return res.json();
};

async function getVacancy(id: string, slug: string) {
  const detail = await fetchJson(`${upstreamHost}/api/vacancy/${id}/${slug}`);
  const vacancy: VacancyDetailsPage | null = detail?.vacancy ?? null;
  let similar: VacancyDetailsPage[] = [];
  const professionId = vacancy?.professions?.[0]?.profession?.id;
  if (professionId) {
    const similarRes = await fetchJson(`${upstreamHost}/api/vacancies?profession_id=${professionId}&limit=5`);
    similar = (similarRes?.vacancies ?? []).filter((v: VacancyDetailsPage) => v.id !== vacancy?.id);
  }
  return { vacancy, similar }; 
}

const truncate = (text: string, len = 160) => {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '');
  return clean.length > len ? `${clean.slice(0, len)}...` : clean;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string; slug: string }> }): Promise<Metadata> {
  const { id, slug } = await params;
  const { vacancy } = await getVacancy(id, slug);
  const title = vacancy?.job_title ? `${vacancy.job_title} | Vakansiya` : 'Vakansiya detalları';
  const description = truncate(vacancy?.content?.content ?? 'Vakansiya haqqında ətraflı məlumat.');
  const url = `/vacancies/${id}/${slug}`;
  const ogImage = vacancy?.company?.logo ? `https://busy.az${vacancy.company.logo}` : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: ogImage ? [ogImage] : undefined },
    twitter: { title, description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function VacancyPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id, slug } = await params;
  const { vacancy, similar } = await getVacancy(id, slug);
  return <VacancyClient vacancy={vacancy as VacancyClientShape} similarVacancies={similar as VacancyClientShape[]} />;
}
