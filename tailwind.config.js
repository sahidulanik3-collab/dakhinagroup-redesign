/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Variant 1: Heritage Luxe
        heritage: {
          green: '#0F3D2E',
          'green-light': '#1A5340',
          'green-dark': '#0A291F',
          gold: '#B8934A',
          'gold-light': '#D4AE5C',
          'gold-dark': '#8E6E32',
          ivory: '#FAF7F0',
          ink: '#14241D',
          muted: '#5C6B63',
        },
        // Variant 2: Modern Minimal
        minimal: {
          stone: '#F4F1EC',
          'stone-dark': '#E7E3DC',
          charcoal: '#1C1C1C',
          terracotta: '#C65D3B',
          muted: '#717171',
        },
        // Variant 3: Midnight Estate
        midnight: {
          navy: '#0B1220',
          card: '#131D31',
          champagne: '#E8D8B0',
          copper: '#B87333',
          border: 'rgba(232, 216, 176, 0.2)',
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
        // Variant 4: Tropical Resort
        tropical: {
          sand: '#F6EFE4',
          teal: '#0E7C7B',
          'teal-dark': '#095857',
          coral: '#FF7A59',
          'coral-dark': '#E5603F',
          ink: '#163231',
          muted: '#4F6765',
        },
        // Variant 5: Editorial Bold
        editorial: {
          paper: '#F2F0EB',
          ink: '#111111',
          vermilion: '#E5391B',
          border: '#111111',
          muted: '#555555',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'Courier New', 'monospace'],
        bengali: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'ken-burns': 'kenBurns 10s ease-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
