# Deployment Guide for Hostingial

This guide explains how to deploy the "Free Online Tools by Yash Dhanjwal" website to your Hostingial domain (`https://ft1.yashdhanjwal.com`).

## Recommended Method: Static Export

Since this project uses client-side APIs for translation and dictionary lookups, it can be deployed as a static site. This is the most compatible method for most hosting plans on Hostingial.

### 1. Update `next.config.ts`
Ensure `next.config.ts` is configured for static export:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 2. Generate the Build
In your local development environment, run:
```bash
npm run build
```
This command will create a folder named **`out`** in your project root. This folder contains all the HTML, CSS, and JS files needed for your website.

### 3. Upload to Hostingial
1. Log in to your **Hostingial Control Panel**.
2. Locate the **File Manager**.
3. Navigate to the directory for your subdomain: `ft1.yashdhanjwal.com` (usually under `public_html/ft1` or similar).
4. **Important:** Delete any existing files in that folder to ensure a clean install.
5. Upload the **contents** of the local `out` folder into the server directory.
   *   **Tip:** It is faster to compress the contents of the `out` folder into a `.zip` file, upload the zip, and use the "Extract" feature in the File Manager.

---

## Alternative: Node.js Deployment (If supported)

If your Hostingial plan supports Node.js applications directly:

### 1. Upload Source
Upload your project files (excluding `node_modules` and `.next`).

### 2. Setup Node.js App
1. Use the **Setup Node.js App** tool in your control panel.
2. Select the Node.js version (20 or 22 recommended).
3. Set the Application Root to your project folder.
4. Set the Application URL to `ft1.yashdhanjwal.com`.
5. Run `npm install` and `npm run build` using the terminal or console provided by the panel.

---

## Final Verification
1. **SSL Certificate:** Ensure you have an SSL certificate active for `ft1.yashdhanjwal.com` to enable HTTPS.
2. **Browse:** Visit your site at `https://ft1.yashdhanjwal.com`.

---
Created by Yash Dhanjwal
[www.yashdhanjwal.com](https://www.yashdhanjwal.com)
