import { Metadata } from 'next';
import VacanciesClient from './VacanciesClient';

export const metadata: Metadata = {
  title: 'Vakansiyalar - Busy.az',
  description: 'Azərbaycanda ən son iş elanları və vakansiyalar.',
  alternates: { canonical: '/vacancies' },
  openGraph: {
    title: 'Vakansiyalar - Busy.az',
    description: 'Azərbaycanda ən son iş elanları və vakansiyalar.',
    url: '/vacancies',
  },
  twitter: {
    title: 'Vakansiyalar - Busy.az',
    description: 'Azərbaycanda ən son iş elanları və vakansiyalar.',
  },
};

export default function VacanciesPage() {
  return <VacanciesClient />;
}
