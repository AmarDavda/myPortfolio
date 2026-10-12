/* Shape of public/data/portfolio.json */
export interface Hero { name: string; title: string; city: string; shortSummary: string; profileImage: string; logo: string; }
export interface About { profileImage2: string; professionalSummary: string; resume: string; }
export interface About2 { aboutImage: string; heading: string; summary: string; whyWorkWithMe: string; }
export interface Education { degree: string; institution: string; duration: string; institutionLogo: string; resultImage: string; }
export interface Certification { name: string; source: string; image: string; }
export interface LanguageItem { language: string; proficiency: string; logo: string; }
export interface InterestItem { title: string; logo: string; }
export interface AdditionalInfo {
  dob: string; native: string; citizenship: string; maritalStatus: string;
  languages: { title: string; intro: string; items: LanguageItem[] };
  interestAreas: { title: string; intro: string; items: InterestItem[] };
}
export interface SkillItem { name: string; level?: number; logo: string; }
export interface SkillCategory { id: string; title: string; tagline: string; items: SkillItem[]; }
export interface Skills { intro: string; categories: SkillCategory[]; }
export interface Experience { role: string; company: string; duration: string; description: string[]; }
export interface Project {
  name: string; description: string; tech: string[]; duration: string;
  category: string; image: string; pdf: string; github: string; demo: string;
}
export interface ContactItem { title: string; content: string; logo: string; link: string; }
export interface Social { name: string; logo: string; link: string; }
export interface Contact {
  title: string; contactImg: string; para1: string; para2: string; para3: string;
  thanks: string; resume: string; item: ContactItem[]; socials: Social[];
}
export interface FooterData {
  tagline: string; status: string; ctaTitle: string; ctaAccent: string; ctaText: string; year: number;
}
export interface Portfolio {
  hero: Hero; about: About; about2: About2; education: Education[]; certifications: Certification[];
  additionalInfo: AdditionalInfo; skills: Skills; experience: Experience[]; projects: Project[];
  contact: Contact; footer: FooterData;
}
