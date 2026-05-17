import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  stroke?: number;
}

export function Icon({ name, size = 20, color = 'currentColor', stroke = 1.8 }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
  };
  const p = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'home':
      return <Svg {...props}><Path {...p} d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" /></Svg>;
    case 'heart':
      return <Svg {...props}><Path {...p} d="M12 21s-7-4.5-9.5-9.2C.8 8.6 2.4 5 6 5c2 0 3.5 1.2 4.5 2.6C11.5 6.2 13 5 15 5c3.6 0 5.2 3.6 3.5 6.8C19 16.5 12 21 12 21z" /></Svg>;
    case 'cal':
      return <Svg {...props}><Rect {...p} x="3" y="5" width="18" height="16" rx="3" /><Path {...p} d="M3 10h18M8 3v4M16 3v4" /></Svg>;
    case 'sparkles':
      return <Svg {...props}><Path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></Svg>;
    case 'user':
      return <Svg {...props}><Circle {...p} cx="12" cy="8" r="4" /><Path {...p} d="M4 21a8 8 0 0 1 16 0" /></Svg>;
    case 'plus':
      return <Svg {...props}><Path {...p} d="M12 5v14M5 12h14" /></Svg>;
    case 'check':
      return <Svg {...props}><Path {...p} d="M4 12l5 5L20 6" /></Svg>;
    case 'back':
      return <Svg {...props}><Path {...p} d="M15 6l-6 6 6 6" /></Svg>;
    case 'fwd':
      return <Svg {...props}><Path {...p} d="M9 6l6 6-6 6" /></Svg>;
    case 'info':
      return <Svg {...props}><Circle {...p} cx="12" cy="12" r="9" /><Path {...p} d="M12 8v.5M11 12h1v5h1" /></Svg>;
    case 'bell':
      return <Svg {...props}><Path {...p} d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6zM10 19a2 2 0 0 0 4 0" /></Svg>;
    case 'pin':
      return <Svg {...props}><Path {...p} d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" /><Circle {...p} cx="12" cy="9" r="2.5" /></Svg>;
    case 'clock':
      return <Svg {...props}><Circle {...p} cx="12" cy="12" r="9" /><Path {...p} d="M12 7v5l3 2" /></Svg>;
    case 'lock':
      return <Svg {...props}><Rect {...p} x="4" y="11" width="16" height="10" rx="2" /><Path {...p} d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>;
    case 'eye':
      return <Svg {...props}><Path {...p} d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><Circle {...p} cx="12" cy="12" r="3" /></Svg>;
    case 'eyeoff':
      return <Svg {...props}><Path {...p} d="M4 4l16 16M10.7 6.2A10.4 10.4 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 4M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6c1.7 0 3.2-.4 4.4-1" /></Svg>;
    case 'gift':
      return <Svg {...props}><Rect {...p} x="3" y="9" width="18" height="12" rx="2" /><Path {...p} d="M3 13h18M12 9v12M8 9c0-3 4-3 4 0 0-3 4-3 4 0" /></Svg>;
    case 'msg':
      return <Svg {...props}><Path {...p} d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" /></Svg>;
    case 'flame':
      return <Svg {...props}><Path {...p} d="M12 22s7-3 7-9c0-4-3-6-3-6-1 3-4 3-4-1-4 3-5 6-5 8 0 6 5 8 5 8z" /></Svg>;
    case 'leaf':
      return <Svg {...props}><Path {...p} d="M21 3c0 9-6 14-14 14-2 0-3-1-3-1s4-12 17-13zM7 17s4-2 7-5" /></Svg>;
    case 'star':
      return <Svg {...props}><Path {...p} d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5l6.5-.5z" /></Svg>;
    case 'cog':
      return <Svg {...props}><Circle {...p} cx="12" cy="12" r="3" /><Path {...p} d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.5-2.4.8a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.4a7 7 0 0 0-2 1.2L5 5.8 3 9.3l2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.5 2.4-.8a7 7 0 0 0 2 1.2L10 21h4l.5-2.4a7 7 0 0 0 2-1.2l2.4.8 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z" /></Svg>;
    case 'logout':
      return <Svg {...props}><Path {...p} d="M15 12H4m0 0l4-4m-4 4l4 4M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" /></Svg>;
    case 'cards':
      return <Svg {...props}><Rect {...p} x="3" y="5" width="14" height="14" rx="2" /><Path {...p} d="M7 9h18v10a2 2 0 0 1-2 2H9" /></Svg>;
    case 'play':
      return <Svg {...props}><Path {...p} d="M7 5l12 7-12 7z" /></Svg>;
    case 'close':
      return <Svg {...props}><Path {...p} d="M6 6l12 12M18 6l-12 12" /></Svg>;
    case 'copy':
      return <Svg {...props}><Rect {...p} x="8" y="8" width="13" height="13" rx="2" /><Path {...p} d="M5 16V5a2 2 0 0 1 2-2h11" /></Svg>;
    case 'send':
      return <Svg {...props}><Path {...p} d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></Svg>;
    default:
      return null;
  }
}
