const logos = ["Logobaze", "Primmark", "Logozen", "Graphicraft", "Aurdicons"];

export default function LogoStrip() {
  return (
    <section>
      <div>
        <p>
          Trusted by 5,000+ founders &amp; business owners
        </p>
        <div>
          {logos.map((name) => (
            <span key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
