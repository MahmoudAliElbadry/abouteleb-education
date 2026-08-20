import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../auth/auth-client.js';
import { useAuth } from '../auth/useAuth.js';

type Language = 'ar' | 'en' | 'tr';

const copy = {
  ar: {
    tag: 'ابدأ الآن',
    title: 'سجل طلب القبول الخاص بك',
    description: 'أخبرنا عن خطتك الدراسية وسيتواصل معك مستشارنا.',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    consent: 'أوافق على التواصل معي بخصوص طلب القبول.',
    consentRequired: 'يرجى الموافقة على التواصل قبل إرسال الطلب.',
    specialization: 'التخصص المفضل',
    submit: 'إرسال الطلب',
    signIn: 'سجل الدخول لفتح النموذج',
    signUp: 'ليس لديك حساب؟ أنشئ حساباً',
    locked: 'النموذج متاح للعملاء المسجلين فقط.',
    verify: 'تحقق من بريدك الإلكتروني أولاً',
    verifyCta: 'الانتقال إلى التحقق',
    success: 'تم إرسال طلبك بنجاح. رقم الطلب:',
    error: 'تعذر إرسال الطلب.',
    options: {
      medicine: 'الطب',
      dentistry: 'طب الأسنان',
      pharmacy: 'الصيدلة',
      engineering: 'الهندسة',
      business: 'إدارة الأعمال',
    },
  },
  en: {
    tag: 'Enroll now',
    title: 'Start your admission request',
    description: 'Tell us about your study plan and one of our advisors will contact you.',
    fullName: 'Full name',
    phone: 'Phone number',
    consent: 'I agree to be contacted about my admission request.',
    consentRequired: 'Please agree to be contacted before submitting your request.',
    specialization: 'Preferred specialization',
    submit: 'Submit request',
    signIn: 'Sign in to unlock the form',
    signUp: "Don't have an account? Create one",
    locked: 'The form is available to signed-in clients only.',
    verify: 'Verify your email before submitting',
    verifyCta: 'Verify email',
    success: 'Your request was submitted successfully. Reference:',
    error: 'Unable to submit the request.',
    options: {
      medicine: 'Medicine',
      dentistry: 'Dentistry',
      pharmacy: 'Pharmacy',
      engineering: 'Engineering',
      business: 'Business Administration',
    },
  },
  tr: {
    tag: 'Şimdi başvur',
    title: 'Başvuru talebinizi başlatın',
    description: 'Eğitim planınızı paylaşın, danışmanımız sizinle iletişime geçsin.',
    fullName: 'Ad soyad',
    phone: 'Telefon numarası',
    consent: 'Başvurum hakkında benimle iletişime geçilmesini kabul ediyorum.',
    consentRequired: 'Talebinizi göndermeden önce iletişim iznini kabul edin.',
    specialization: 'Tercih edilen bölüm',
    submit: 'Talebi gönder',
    signIn: 'Formu açmak için giriş yapın',
    signUp: 'Hesabınız yok mu? Oluşturun',
    locked: 'Form yalnızca giriş yapan müşterilere açıktır.',
    verify: 'Göndermeden önce e-postanızı doğrulayın',
    verifyCta: 'E-postayı doğrula',
    success: 'Talebiniz başarıyla gönderildi. Referans:',
    error: 'Talep gönderilemedi.',
    options: {
      medicine: 'Tıp',
      dentistry: 'Diş hekimliği',
      pharmacy: 'Eczacılık',
      engineering: 'Mühendislik',
      business: 'İşletme',
    },
  },
} as const;

type Specialization = keyof (typeof copy)['en']['options'];

export function EnrollmentSection({ language }: { language: Language }) {
  const t = copy[language];
  const { user, isPending } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.fullName ?? '',
    phoneNumber: '',
    specialization: 'medicine' as Specialization,
    consentAccepted: false,
  });
  const order = createOrder;
  const [submittedReference, setSubmittedReference] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.fullName) setForm((current) => ({ ...current, fullName: user.fullName ?? '' }));
  }, [user?.fullName]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!form.consentAccepted) {
      setError(t.consentRequired);
      return;
    }
    setSubmitting(true);
    try {
      const result = await order({
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        specialization: form.specialization,
      });
      setSubmittedReference(result.order.reference);
      setForm({
        fullName: user?.fullName ?? '',
        phoneNumber: '',
        specialization: 'medicine',
        consentAccepted: false,
      });
    } catch {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  const signedOut = !isPending && !user;
  const unverified = Boolean(user && !user.emailVerified);
  const locked = signedOut || unverified;
  return (
    <section className="enrollment-section" id="enroll">
      <div className="section-heading">
        <p>{t.tag}</p>
        <h2>{t.title}</h2>
        <span>{t.description}</span>
      </div>
      <div className={`enrollment-card${locked ? ' is-locked' : ''}`}>
        {locked && (
          <div className="enrollment-lock" aria-hidden="true">
            🔒
          </div>
        )}
        {signedOut && (
          <div className="enrollment-gate">
            <p>{t.locked}</p>
            <Link className="button" to="/login?redirect=%2Fapplications">
              {t.signIn}
            </Link>
            <Link to="/register">{t.signUp}</Link>
          </div>
        )}
        {unverified && (
          <div className="enrollment-gate">
            <p>{t.verify}</p>
            <Link
              className="button"
              to={`/verify-email?email=${encodeURIComponent(user?.email ?? '')}`}
            >
              {t.verifyCta}
            </Link>
          </div>
        )}
        <form onSubmit={submit} aria-disabled={locked}>
          <fieldset disabled={locked || submitting || isPending}>
            <label>
              {t.fullName}
              <input
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                required
              />
            </label>
            <label>
              {t.phone}
              <input
                value={form.phoneNumber}
                onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })}
                required
              />
            </label>
            <label>
              {t.specialization}
              <select
                value={form.specialization}
                onChange={(event) =>
                  setForm({ ...form, specialization: event.target.value as Specialization })
                }
              >
                {(Object.keys(t.options) as Specialization[]).map((option) => (
                  <option key={option} value={option}>
                    {t.options[option]}
                  </option>
                ))}
              </select>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.consentAccepted}
                onChange={(event) =>
                  setForm({ ...form, consentAccepted: event.target.checked })
                }
                required
              />
              {t.consent}
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button" type="submit" disabled={!form.consentAccepted}>
              {t.submit}
            </button>
          </fieldset>
        </form>
        {submittedReference && (
          <p className="form-success" role="status">
            {t.success} <strong>{submittedReference}</strong>
          </p>
        )}
      </div>
    </section>
  );
}
