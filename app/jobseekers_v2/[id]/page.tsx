import { Metadata } from 'next';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';
import JobseekerDetailClient, { Jobseeker } from '../JobseekerDetailClient';

const upstreamHost = 'https://api.busy.az';

const fetchJobseeker = async (id: string): Promise<Jobseeker | null> => {
  const res = await cachedFetchUpstream(`${upstreamHost}/api/jobseeker/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
};

const truncate = (text?: string, len = 160) => {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '');
  return clean.length > len ? `${clean.slice(0, len)}...` : clean;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const jobseeker = await fetchJobseeker(id);
  const fullName = jobseeker ? `${jobseeker.name || ''} ${jobseeker.last_name || ''}`.trim() : '';
  const title = fullName ? `${fullName} | İşaxtaran` : `İşaxtaran ${id}`;
  const desired = jobseeker?.desired_jobs?.[0]?.profession?.title;
  const description = truncate(desired ? `Axtardığı vəzifə: ${desired}` : 'İşaxtaran haqqında məlumat');
  const url = `/jobseekers_v2/${id}`;
  const ogImage = jobseeker?.avatar ? `https://busy.az${jobseeker.avatar}` : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: ogImage ? [ogImage] : undefined },
    twitter: { title, description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function JobseekerDetailPageWrapper({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const jobseeker = await fetchJobseeker(resolvedParams.id);
  return <JobseekerDetailClient params={resolvedParams} initialJobseeker={jobseeker ?? undefined} />;
}
