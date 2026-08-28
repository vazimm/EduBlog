export type InstitutionalSection = {
  title: string;
  paragraphs: string[];
};

export type InstitutionalPageProps = {
  title: string;
  subtitle: string;
  sections: InstitutionalSection[];
};
