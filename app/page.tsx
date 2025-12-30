import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Busy.az - İş elanları və karyera platforması',
  description: 'Azərbaycanda minlərlə iş elanını, şirkətləri və karyera məzmununu kəşf et.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Busy.az - İş elanları və karyera platforması',
    description: 'Azərbaycanda minlərlə iş elanını, şirkətləri və karyera məzmununu kəşf et.',
    url: '/',
  },
  twitter: {
    title: 'Busy.az - İş elanları və karyera platforması',
    description: 'Azərbaycanda minlərlə iş elanını, şirkətləri və karyera məzmununu kəşf et.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
