export function Sprig({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 144 176" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 166C64 142 87 104 103 34M62 138C77 132 94 127 111 111M75 117C67 102 58 88 45 78M87 94c13-4 25-10 37-21M95 71C90 55 84 45 75 36" />
        <path d="M102 39c-6-16-2-28 10-36 5 13 1 27-10 36ZM94 68C77 66 68 53 70 32c17 6 27 19 24 36ZM100 66c6-17 18-26 38-24-7 17-21 25-38 24ZM78 114c-19 3-35-11-40-38 20 4 34 17 40 38ZM88 93c8-17 26-23 48-21-11 17-31 23-48 21ZM63 136c-18 1-30-10-37-31 19 3 33 15 37 31ZM72 134c12-18 27-26 45-25-10 18-26 27-45 25Z" />
      </g>
    </svg>
  );
}

const serviceMarks = {
  epilations: "M16 3c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10ZM5 20v8m-4-4h8m18-5v8m-4-4h8",
  "beaute-du-regard": "M2 16c4-5 9-7 14-7s10 2 14 7c-4 5-9 7-14 7S6 21 2 16Zm18 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM7 11 4 7m12 2V4m9 7 3-4",
  "mains-et-pieds": "M5 25c6-8 13-12 22-16M7 22C4 14 9 6 17 3c1 8-2 14-8 17m2 0c5-8 12-12 19-11-2 9-10 14-19 13m-1-1c8-1 14 1 17 7-7 4-13 2-17-5",
  "soins-du-visage": "M16 2c4 7 10 12 10 18a10 10 0 0 1-20 0C6 14 12 9 16 2Zm-5 19c0 3 2 5 5 5",
  "soins-du-corps": "M3 12c5 0 8-3 13-3s8 3 13 3M3 18c5 0 8-3 13-3s8 3 13 3M3 24c5 0 8-3 13-3s8 3 13 3",
};

export function ServiceMark({ slug }: { slug: keyof typeof serviceMarks }) {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.12" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={serviceMarks[slug]} /></svg>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={diagonal ? "M6 18 18 6M8 6h10v10" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
