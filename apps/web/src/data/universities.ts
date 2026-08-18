export type University = {
  id: string;
  name: string;
  image: string;
  city: 'Istanbul' | 'Ankara' | 'Kocaeli';
};

const image = (filename: string) => `/${filename}`;

export const universities: University[] = [
  {
    id: 'acibadem',
    name: 'Acıbadem Mehmet Ali Aydınlar Üniversitesi',
    image: image('ACIBADEM MEHMET ALI_ç AYDINLAR U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'altinbas',
    name: 'Altınbaş Üniversitesi',
    image: image('ALTINBAS_د U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'ankara-bilim',
    name: 'Ankara Bilim Üniversitesi',
    image: image('ANKARA BI_çLI_çM U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Ankara',
  },
  {
    id: 'ankara-medipol',
    name: 'Ankara Medipol Üniversitesi',
    image: image('ANKARA MEDI_çPOL U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Ankara',
  },
  {
    id: 'atilim',
    name: 'Atılım Üniversitesi',
    image: image('ATILIM U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Ankara',
  },
  {
    id: 'bahcesehir',
    name: 'Bahçeşehir Üniversitesi',
    image: image('BAHC_دES_دEHI_çR U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'beykoz',
    name: 'Beykoz Üniversitesi',
    image: image('BEYKOZ U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'bezmialem',
    name: 'Bezmialem Vakıf Üniversitesi',
    image: image('BEZM-I_ç A_éLEM VAKIF U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'biruni',
    name: 'Biruni Üniversitesi',
    image: image('BI_çRUNI_ç U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'dogus',
    name: 'Doğuş Üniversitesi',
    image: image('DOG__US_د U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'fatih-sultan-mehmet',
    name: 'Fatih Sultan Mehmet Vakıf Üniversitesi',
    image: image('FATI_çH SULTAN MEHMET VAKIF U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'fenerbahce',
    name: 'Fenerbahçe Üniversitesi',
    image: image('FENERBAHC_دE U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'halic',
    name: 'Haliç Üniversitesi',
    image: image('HALI_çC_د U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'ibn-haldun',
    name: 'İbn Haldun Üniversitesi',
    image: image('I_çBN HALDUN U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-arel',
    name: 'İstanbul Arel Üniversitesi',
    image: image('I_çSTANBUL AREL U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-atlas',
    name: 'İstanbul Atlas Üniversitesi',
    image: image('I_çSTANBUL ATLAS U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-aydin',
    name: 'İstanbul Aydın Üniversitesi',
    image: image('I_çSTANBUL AYDIN U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-beykent',
    name: 'İstanbul Beykent Üniversitesi',
    image: image('I_çSTANBUL BEYKENT U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-bilgi',
    name: 'İstanbul Bilgi Üniversitesi',
    image: image('I_çSTANBUL BI_çLGI_ç U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-esenyurt',
    name: 'İstanbul Esenyurt Üniversitesi',
    image: image('I_çSTANBUL ESENYURT U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-galata',
    name: 'İstanbul Galata Üniversitesi',
    image: image('I_çSTANBUL GALATA U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-gedik',
    name: 'İstanbul Gedik Üniversitesi',
    image: image('I_çSTANBUL GEDI_çK U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-gelisim',
    name: 'İstanbul Gelişim Üniversitesi',
    image: image('I_çSTANBUL GELI_çS_دI_çM U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-kent',
    name: 'İstanbul Kent Üniversitesi',
    image: image('I_çSTANBUL KENT U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-kultur',
    name: 'İstanbul Kültür Üniversitesi',
    image: image('I_çSTANBUL KU_êLTU_êR U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-medipol',
    name: 'İstanbul Medipol Üniversitesi',
    image: image('I_çSTANBUL MEDI_çPOL U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-nisantasi',
    name: 'İstanbul Nişantaşı Üniversitesi',
    image: image('I_çSTANBUL NI_çS_دANTAS_دI U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-okan',
    name: 'İstanbul Okan Üniversitesi',
    image: image('I_çSTANBUL OKAN U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-sabahattin-zaim',
    name: 'İstanbul Sabahattin Zaim Üniversitesi',
    image: image('I_çSTANBUL SABAHATTI_çN ZAI_çM U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-ticaret',
    name: 'İstanbul Ticaret Üniversitesi',
    image: image('I_çSTANBUL TI_çCARET U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-topkapi',
    name: 'İstanbul Topkapı Üniversitesi',
    image: image('I_çSTANBUL TOPKAPI U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istanbul-yeni-yuzyil',
    name: 'İstanbul Yeni Yüzyıl Üniversitesi',
    image: image('I_çSTANBUL YENI_ç YU_êZYIL U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'istinye',
    name: 'İstinye Üniversitesi',
    image: image('I_çSTI_çNYE U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'isik',
    name: 'Işık Üniversitesi',
    image: image('IS_دIK U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'kocaeli-saglik',
    name: 'Kocaeli Sağlık ve Teknoloji Üniversitesi',
    image: image('KOCAELI_ç SAG__LIK VE TEKNOLOJI_ç U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Kocaeli',
  },
  {
    id: 'maltepe',
    name: 'Maltepe Üniversitesi',
    image: image('MALTEPE U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'ozyegin',
    name: 'Özyeğin Üniversitesi',
    image: image('O_êZYEG__I_çN U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'ostim',
    name: 'OSTİM Teknik Üniversitesi',
    image: image('OSTI_çM TEKNI_çK U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Ankara',
  },
  {
    id: 'turk-hava-kurumu',
    name: 'Türk Hava Kurumu Üniversitesi',
    image: image('TU_êRK HAVA KURUMU U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Ankara',
  },
  {
    id: 'uskudar',
    name: 'Üsküdar Üniversitesi',
    image: image('U_êSKU_êDAR U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
  {
    id: 'yeditepe',
    name: 'Yeditepe Üniversitesi',
    image: image('YEDI_çTEPE U_êNI_çVERSI_çTESI_ç.png'),
    city: 'Istanbul',
  },
];
