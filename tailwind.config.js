/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
      fontFamily: {
        sans: ['var(--font-family-body)', 'sans-serif'], // Default body font
        amiri: ['var(--font-family-quran)', 'Amiri Quran', 'serif'], // Amiri Quran font
        // KFGQPC Uthmani fonts for authentic Quranic typography
        'kfgqpc-hafs': ['KFGQPC-Hafs', 'Scheherazade New', 'serif'],
        'kfgqpc-hafs-smart': ['KFGQPC-Hafs-Smart', 'KFGQPC-Hafs', 'serif'],
        'kfgqpc-naskh': ['KFGQPC-Uthman-Naskh', 'Amiri-Quran', 'serif'],
        'uthmani': ['KFGQPC-Hafs', 'KFGQPC-Uthman-Naskh', 'serif'],
        'arabic': ['KFGQPC-Hafs-Smart', 'KFGQPC-Hafs', 'KFGQPC-Uthman-Naskh', 'Amiri-Quran', 'serif']
      },
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))', // General background
  			foreground: 'hsl(var(--foreground))', // General foreground
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Custom DUSON color palette mapped to CSS variables
        // These CSS variables will be defined in styles/themes.css
        duson: {
          cream:  'hsl(var(--duson-cream))',   // background (light)
          yellow: 'hsl(var(--duson-yellow))', // accent / links
          ebony:  'hsl(var(--duson-ebony))',  // background (dark) + text
          crimson:'hsl(var(--duson-crimson))' // highlight / buttons / links
        }
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			ripple: {
  				'0%': {
  					opacity: 1,
  					transform: 'scale(0)'
  				},
  				'100%': {
  					opacity: 0,
  					transform: 'scale(4)'
  				}
  			},
              'spin-slow': {
                  from: {
                      transform: 'rotate(0deg)'
                  },
                  to: {
                      transform: 'rotate(360deg)'
                  }
              },
              // Page curl animation keyframes
              'page-curl': {
                '0%': {
                  transform: 'rotateY(0deg) perspective(1000px) rotateX(0deg)',
                  transformOrigin: 'left center',
                },
                '100%': {
                  transform: 'rotateY(-180deg) perspective(1000px) rotateX(0deg)',
                  transformOrigin: 'left center',
                },
              },
              'page-slide-from-right': {
                '0%': { transform: 'translateX(100%)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' },
              },
              'page-slide-to-left': {
                '0%': { transform: 'translateX(0)', opacity: '1' },
                '100%': { transform: 'translateX(-100%)', opacity: '0' },
              }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			ripple: 'ripple 0.6s linear forwards',
              'spin-slow': 'spin-slow 8s linear infinite',
              'page-curl': 'page-curl var(--page-transition-duration, 0.6s) ease-in-out',
              'page-slide-from-right': 'page-slide-from-right var(--page-transition-duration, 0.5s) ease-out',
              'page-slide-to-left': 'page-slide-to-left var(--page-transition-duration, 0.5s) ease-out',
              // Enhanced Islamic animations
              'gentle-float': 'gentle-float 3s ease-in-out infinite',
              'gentle-pulse': 'gentle-pulse 2s ease-in-out infinite',
              'shimmer': 'shimmer 2s infinite',
              'slide-in-up': 'slide-in-up 0.6s ease-out',
              'slide-in-left': 'slide-in-left 0.6s ease-out',
              'scale-in': 'scale-in 0.5s ease-out',
              'spin-reverse': 'spin-reverse 6s linear infinite',
              'wobble': 'wobble 1s ease-in-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 