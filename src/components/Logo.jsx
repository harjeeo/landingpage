export default function Logo({ height = 28 }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-ink-900"
      style={{ height }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{ height, width: height }}
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0,0 H70 V30 H40 V70 H70 V100 H0 Z M20,10 H55 V45 H20 Z"
        />
      </svg>
      <span
        className="w-px self-stretch bg-current opacity-80"
        style={{ height: height * 0.9 }}
      />
      <span
        className="font-extrabold leading-none tracking-tight"
        style={{ fontSize: height * 0.86 }}
      >
        Ojar
      </span>
    </span>
  );
}
