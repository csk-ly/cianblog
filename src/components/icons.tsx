export function Arrow({
  className = "",
  diagonal = false,
}: {
  className?: string;
  diagonal?: boolean;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function ShoreMark() {
  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 40 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 18c6-10 13 10 20 0s11 0 11 0M5 25c6-10 13 10 20 0s11 0 11 0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="28" cy="7" r="3" fill="currentColor" />
    </svg>
  );
}
