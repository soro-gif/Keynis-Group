import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                keynis: {
                    navy: '#0B1E4D',
                    'navy-dark': '#071433',
                    'navy-light': '#1B3572',
                    red: '#D32031',
                    'red-dark': '#A5171F',
                    gray: '#F4F6FA',
                },
            },
        },
    },

    plugins: [forms],
};
