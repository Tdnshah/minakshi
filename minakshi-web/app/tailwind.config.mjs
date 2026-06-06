/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                paper:           '#f4efe6',
                'paper-deep':    '#ebe4d6',
                'paper-soft':    '#faf6ee',
                ink:             '#1a1814',
                'ink-mid':       '#4a4339',
                'ink-soft':      '#807868',
                'rule-soft':     '#c9c0ad',
                accent:          '#7a1f1f',
                'accent-deep':   '#5a1414',
                'accent-on':     '#f4efe6',
            },
            fontFamily: {
                display: ['Fraunces', 'Iowan Old Style', 'Charter', 'Georgia', 'serif'],
                body:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
                mono:    ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
            },
            fontSize: {
                'eyebrow': ['0.75rem',   { lineHeight: '1',    letterSpacing: '0.18em' }],
                'meta':    ['0.8125rem', { lineHeight: '1.2',  letterSpacing: '0.1em'  }],
                'lead':    ['1.625rem',  { lineHeight: '1.4',  letterSpacing: '-0.015em' }],
                'h4':      ['1.5rem',    { lineHeight: '1.04', letterSpacing: '-0.01em'  }],
                'h3':      ['2.25rem',   { lineHeight: '1.04', letterSpacing: '-0.02em'  }],
                'h2':      ['4.5rem',    { lineHeight: '1.04', letterSpacing: '-0.02em'  }],
                'h1':      ['7rem',      { lineHeight: '0.92', letterSpacing: '-0.035em' }],
            },
            letterSpacing: {
                display: '-0.02em',
                hero:    '-0.035em',
                mono:    '0.14em',
                eyebrow: '0.18em',
            },
            maxWidth: {
                'prose-narrow': '56ch',
                'prose':        '68ch',
                'shell':        '1320px',
            },
            transitionTimingFunction: {
                editorial: 'cubic-bezier(0.23, 1, 0.32, 1)',
            },
            borderColor: { DEFAULT: '#1a1814' },
        },
    },
    plugins: [],
};
