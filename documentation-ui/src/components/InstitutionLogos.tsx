export interface Institution {
  name: string;
  url: string;
  logo: string;
  /** Two-line lockups need extra height to read at the same scale as single-line ones. */
  stacked?: boolean;
}

export const institutions: Institution[] = [
  {
    name: "Stony Brook University",
    url: "https://www.stonybrook.edu/",
    logo: "images/logos/stony-brook.png",
  },
  {
    name: "Vanderbilt University",
    url: "https://www.vanderbilt.edu/",
    logo: "images/logos/vanderbilt.png",
  },
  {
    name: "University of Pennsylvania",
    url: "https://www.upenn.edu/",
    logo: "images/logos/penn.png",
  },
  {
    name: "NRC Canada",
    url: "https://nrc.canada.ca/en",
    logo: "images/logos/nrc.png",
    stacked: true,
  },
];

const linkClass =
  "block rounded transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-ring";

export const InstitutionLogoBar = () => (
  <ul className="flex items-center gap-4 md:gap-6">
    {institutions.map((institution) => (
      <li key={institution.name}>
        <a href={institution.url} target="_blank" rel="noreferrer" title={institution.name} className={linkClass}>
          <img
            src={import.meta.env.BASE_URL + institution.logo}
            alt={institution.name}
            className={`${institution.stacked ? "h-9 md:h-11" : "h-6 md:h-8"} w-auto object-contain`}
          />
        </a>
      </li>
    ))}
  </ul>
);
