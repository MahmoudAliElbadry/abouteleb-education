import { useSearchParams } from 'react-router-dom';
import { EnrollmentSection } from './features/enrollment/EnrollmentSection.js';

export function ApplicationPage() {
  const [searchParams] = useSearchParams();
  const language = searchParams.get('lang');
  const selectedLanguage = language === 'ar' || language === 'tr' ? language : 'en';

  return <EnrollmentSection language={selectedLanguage} />;
}
