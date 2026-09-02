import heroVideo from '../assets/hero-page-video.mp4';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="section is-hero"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 0
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </section>
  );
}
