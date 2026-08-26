type InstitutionalSection = {
  title: string;
  paragraphs: string[];
};

type InstitutionalPageProps = {
  title: string;
  subtitle: string;
  sections: InstitutionalSection[];
};

export default function InstitutionalPage({
  title,
  subtitle,
  sections,
}: InstitutionalPageProps) {
  return (
    <div className="mx-auto w-[min(1200px,92%)] py-10">
      <section className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:p-8">
        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{subtitle}</p>
        </header>

        <div className="mt-6 space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              <div className="mt-2 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
