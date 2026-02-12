import { useState, useRef, useEffect } from 'react';
import './InfoDot.css';

export default function InfoDot({ text, position = 'top-right', size = 'normal' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <span className={`info-dot-wrap ${position} ${size}`} ref={ref}>
      <span
        className={`info-dot ${open ? 'active' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        onMouseEnter={() => setOpen(true)}
      >
        <svg width="8" height="8" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3.5" fill="#00E5A0" opacity={open ? 1 : 0.6} />
        </svg>
      </span>
      {open && (
        <div className="info-dot-tooltip" onClick={(e) => e.stopPropagation()}>
          <div className="info-dot-text">{text}</div>
        </div>
      )}
    </span>
  );
}