import { useEffect, useState, useRef } from 'react';

const wordsData = [
  { text: 'Building', isHighlight: false },
  { text: 'software,', isHighlight: true },
  { text: 'shops,', isHighlight: true },
  { text: 'and', isHighlight: false },
  { text: 'websites', isHighlight: true },
  { text: 'that', isHighlight: false },
  { text: 'move', isHighlight: false },
  { text: 'companies', isHighlight: false },
  { text: 'forward', isHighlight: false },
  { text: 'with', isHighlight: false },
  { text: 'precision.', isHighlight: false },
  { text: 'We', isHighlight: false },
  { text: 'join', isHighlight: false },
  { text: 'forces', isHighlight: false },
  { text: 'with', isHighlight: false },
  { text: 'enterprise', isHighlight: true },
  { text: 'companies', isHighlight: true },
  { text: 'and', isHighlight: false },
  { text: 'visionary', isHighlight: true },
  { text: 'startups,', isHighlight: true },
  { text: 'leveraging', isHighlight: false },
  { text: 'our', isHighlight: false },
  { text: 'full-cycle', isHighlight: false },
  { text: 'digital', isHighlight: false },
  { text: 'expertise', isHighlight: false },
  { text: 'to', isHighlight: false },
  { text: 'create', isHighlight: false },
  { text: 'brands,', isHighlight: false },
  { text: 'experiences,', isHighlight: false },
  { text: 'and', isHighlight: false },
  { text: 'products', isHighlight: false },
  { text: 'that', isHighlight: false },
  { text: 'drive', isHighlight: false },
  { text: 'growth', isHighlight: false },
  { text: 'and', isHighlight: false },
  { text: 'transformation.', isHighlight: true }
];

export default function Services() {
  const headingRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const calculateTargetProgress = () => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing ONLY when heading text top reaches the exact center of screen (50% viewport)
      const startPoint = windowHeight * 0.50; 
      const endPoint = windowHeight * 0.12;   // Finish reveal near upper viewport
      
      const textTop = rect.top;

      if (textTop > startPoint) {
        // STRICTLY 0 before text reaches middle of screen!
        targetProgressRef.current = 0;
      } else {
        const totalDistance = startPoint - endPoint;
        const currentPos = startPoint - textTop;
        targetProgressRef.current = Math.max(0, Math.min(1, currentPos / totalDistance));
      }
    };

    // Smooth Lerp loop running at 60fps for butter-smooth animation
    const renderLoop = () => {
      calculateTargetProgress();
      
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.14;
      setDisplayProgress(currentProgressRef.current);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', calculateTargetProgress, { passive: true });
    renderLoop();

    return () => {
      window.removeEventListener('scroll', calculateTargetProgress);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      id="services" 
      style={{ 
        paddingTop: '140px', 
        paddingBottom: '140px', 
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)', 
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        background: '#F5F5F6' 
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        <h2 
          ref={headingRef}
          style={{ 
            fontSize: 'clamp(1.7rem, 3.3vw, 2.7rem)', 
            fontWeight: 400, 
            lineHeight: 1.45, 
            letterSpacing: '-0.025em',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.35em 0.35em'
          }}
        >
          {wordsData.map((wordObj, idx) => {
            // Sequential Word-by-Word calculation: Word 0 -> Word 1 -> Word 2 -> ... -> Word 35
            const totalWords = wordsData.length;
            const wordStart = idx / totalWords;
            const wordEnd = (idx + 1.2) / totalWords;
            
            const rawProgress = (displayProgress - wordStart) / (wordEnd - wordStart);
            const wordProgress = Math.max(0, Math.min(1, rawProgress));

            let color;
            if (wordObj.isHighlight) {
              // Highlighted words: rgba(0,0,0,0.32) -> #FF470A (rgb(255, 71, 10))
              const r = Math.round(255 * wordProgress);
              const g = Math.round(71 * wordProgress);
              const b = Math.round(10 * wordProgress);
              const alpha = 0.32 + 0.68 * wordProgress;
              color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            } else {
              // Normal words: rgba(0,0,0,0.32) -> #000000 (rgb(0, 0, 0))
              const alpha = 0.32 + 0.68 * wordProgress;
              color = `rgba(0, 0, 0, ${alpha})`;
            }

            const translateY = (1 - wordProgress) * 3;

            return (
              <span
                key={idx}
                style={{
                  color: color,
                  transform: `translateY(${translateY}px)`,
                  display: 'inline-block',
                  willChange: 'color, transform'
                }}
              >
                {wordObj.text}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
