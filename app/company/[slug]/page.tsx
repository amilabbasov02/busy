import { Metadata } from 'next';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';
// NOTE: Actual company UI is rendered under nested routes and via CompanyProvider in layout.
// This page stays minimal.

const upstreamHost = 'https://api.busy.az';

const fetchCompany = async (slug: string) => {
  const res = await cachedFetchUpstream(`${upstreamHost}/api/companies/${slug}/detail`);
  if (!res.ok) return null;
  return res.json();
};

const truncate = (text?: string, len = 160) => {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '');
  return clean.length > len ? `${clean.slice(0, len)}...` : clean;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Next.js 15.5 PageProps typing expects params to be Promise-like
  const { slug } = await params;
  const company = await fetchCompany(slug);
  const title = company?.title ? `${company.title} | Busy.az` : 'Şirkət - Busy.az';
  const description = truncate(company?.about) || 'Şirkət haqqında məlumat.';
  const url = `/company/${slug}`;
  const ogImage = company?.logo ? `https://busy.az${company.logo}` : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: ogImage ? [ogImage] : undefined },
    twitter: { title, description, images: ogImage ? [ogImage] : undefined },
  };
}

export default function CompanyProfilePageWrapper() {
  // Company page uses CompanyProvider in layout; the actual UI is rendered in nested routes.
  // Keep this page minimal to avoid broken imports.
  return null;
}
