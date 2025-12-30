import { Metadata } from 'next';
import JobseekersClient from './JobseekersClient';

export const metadata: Metadata = {
  title: 'İşaxtaranlar - Busy.az',
  description: 'İşaxtaranların siyahısı və filtrləmə.',
  alternates: { canonical: '/jobseekers_v2' },
};

export default function JobseekersPage() {
  return <JobseekersClient />;
}
