export default function Logo({ height = 28, variant = "black", className = "" }) {
  const src = variant === "white" ? "/dc-ojar-logo-white.svg" : "/dc-ojar-logo-black.svg";
  return (
    <img
      src={src}
      alt="Ojar"
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
