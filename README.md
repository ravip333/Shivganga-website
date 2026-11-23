# Shivganga Residential Society - Official Information Website

A modern, elegant, and responsive residential society informational portal built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

## 📍 Society & Location Reference
- **Society Name**: Shivganga Residential Society (Registered Co-operative Housing Society)
- **Structure**: Standalone 6-Floor Residential Tower (Ground + 6 Floors / G+6)
- **Key Features**: Dedicated Resident Ground & Covered Parking, Passenger Elevator serving all floors, 24x7 Security Watch
- **Google Location Reference**: [https://share.google/fc4tVuIdwMKMJBVt9](https://share.google/fc4tVuIdwMKMJBVt9)
- **GitHub Repository**: `https://github.com/ravip333/Shivganga-website`
- **GitHub Pages URL**: `https://ravip333.github.io/Shivganga-website/`

---

## 🏛️ Website Features
- **100% Real Photographs & Walkthrough Videos**: All images and videos are authentic media sourced directly from the society campus.
- **Hero Background Slider**: Real daytime elevation and evening illumination photos cycling automatically with custom slide indicators.
- **Verified Building Structure**: Standalone G+6 tower, dedicated parking bays, passenger elevator, water storage infrastructure, and round-the-clock security.
- **Nearby Places & Connectivity**: Direct information on local railway stations, auto-rickshaw stands, hospitals, daily vegetable markets, and educational institutions.
- **Interactive Photo Collages**: Toggle between an editorial "Collage View" and uniform "Grid View", equipped with a keyboard-navigable Lightbox and bottom thumbnail filmstrip.
- **Video Showcase**: Clean light studio player cards streaming actual campus walkthroughs.
- **Notice Board**: Society circulars and scheduled maintenance notices.
- **Zero Commercial Content**: Purely informational portal for residents and visitors.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

You can deploy the website to GitHub Pages anytime with a single command:

```bash
npm run deploy
```

### How it works:
1. `npm run deploy` automatically executes `npm run build` (compiling TypeScript and Vite bundle with relative asset paths into `dist/`).
2. It pushes the `dist/` bundle directly to your repository's `gh-pages` branch via `gh-pages`.
3. In your GitHub repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment > Source**, ensure **Deploy from a branch** is selected.
   - Set Branch to **`gh-pages`** and folder to **`/ (root)`**, then click **Save**.
4. Your website will be live at:
   **`https://ravip333.github.io/Shivganga-website/`**
