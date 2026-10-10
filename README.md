# Maazan Bhaijaan — Premium Birthday Website

A responsive React + Vite birthday microsite, designed for mobile, tablet, and desktop.

## Run locally

Requirements: Node.js 18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

To test the production build:

```bash
npm run build
npm run preview
```

## Add your photos

Place your own photos in `public/images/` with these names:
- `brother.jpg` — portrait used in the About section
- `memory-1.jpg` through `memory-6.jpg` — gallery photos

Create the `public/images` folder if it does not exist. Use `.jpg` filenames or change the image paths in `src/App.jsx` to match your files. Until then, gradient placeholders are shown where local photos are missing. The gallery's “Add your photos” control previews selected photos during the current page session; it does not upload them to a server or permanently save them.

## Music

The Play Music / Pause Music controls are now connected to a real HTML audio player. Put a legally obtained MP3 of Nach Meri Jaan at `public/music/nach-meri-jaan.mp3`. Music starts only after a click/tap due to browser autoplay rules. The MP3 is not included.

## Birthday date

The countdown targets October 16, 2026. After that date it displays zeroes.

## Deploy free with Vercel

1. Create a GitHub repository and push this project.
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import the repository.
4. Framework preset: **Vite**. Build command: `npm run build`; output directory: `dist`.
5. Click **Deploy** and share the generated URL.

You can also use Netlify: build command `npm run build`, publish directory `dist`.

## Notes

- Mobile navigation collapses into a menu on narrow screens.
- Buttons, countdown, gallery filtering, image preview modal, wish form, surprise letter, and candle interaction are functional.
- Photo selection and wishes are stored only in React state and reset on refresh. They are not uploaded to a backend.
- Background scenic imagery loads from Unsplash and Google Fonts load from Google Fonts, so those visual assets need an internet connection.


## Personalised version
Your five uploaded photos are already included. Music playback is wired up: add your own licensed `nach-meri-jaan.mp3` to `public/music/`. The actual copyrighted song is not included.
