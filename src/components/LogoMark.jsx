import { useId } from 'react';

/**
 * LogoMark — abstract geometric brand mark (letterless).
 *
 * Composition: a gradient diamond interlocking with an outline ring,
 * inside a soft badge. Reads clearly from 24px up to large sizes.
 * Used by the Navbar, Footer and matched by the favicon.
 */
export default function LogoMark({ className = 'h-9 w-9' }) {
  const rawId = useId();
  const gid = `logo${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gid} x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <rect
        x="1.4"
        y="1.4"
        width="37.2"
        height="37.2"
        rx="11"
        fill="#151F32"
        stroke={`url(#${gid})`}
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />

      {/* Outline ring (drawn under the diamond for depth) */}
      <circle cx="25.5" cy="25.5" r="7" stroke={`url(#${gid})`} strokeWidth="2.4" />

      {/* Filled diamond interlocking the ring */}
      <rect
        x="10"
        y="10"
        width="13"
        height="13"
        rx="3.5"
        transform="rotate(45 16.5 16.5)"
        fill={`url(#${gid})`}
      />
    </svg>
  );
}
