# Deployment Guide for Hostinger

This guide explains how to deploy the "Free Online Tools by Yash Dhanjwal" website to your Hostinger domain (`https://ft1.yashdhanjwal.com`).

## Option 1: Static Export (Recommended for Shared Hosting)

Since this project uses client-side APIs for translation and dictionary lookups, it can be deployed as a static site. This is the simplest and fastest method for Hostinger Shared or Cloud hosting.

### 1. Update `next.config.ts`
Modify `next.config.ts` to include the export output:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

### 2. Build the Project
Run the following command in your terminal:
```bash
npm run build
```
This will create an `out` folder in your project root.

### 3. Upload to Hostinger
1. Log in to your **Hostinger hPanel**.
2. Go to **File Manager**.
3. Navigate to the `public_html` directory (or your subdomain folder).
4. Upload all the contents of the `out` folder directly into `public_html`.

---

## Option 2: Node.js Hosting (For VPS or Specialized Node.js Plans)

If you are using a Hostinger VPS or a specialized Node.js plan:

### 1. Upload Source Code
Upload the entire project folder (excluding `node_modules` and `.next`) to your server via FTP or Git.

### 2. Install Dependencies & Build
On your server terminal:
```bash
npm install
npm run build
```

### 3. Start with PM2
To keep the application running in the background:
```bash
npm install -g pm2
pm2 start npm --name "online-tools" -- start
pm2 save
```

### 4. Reverse Proxy
Configure your server (Nginx/Apache) to proxy requests from your domain to `http://localhost:3000`.

---

## Final Steps (For Both Options)

### 1. Connect Domain
Ensure your DNS records for `ft1.yashdhanjwal.com` are pointing to your Hostinger server IP.

### 2. Enable SSL
In Hostinger hPanel, go to the **SSL** section and install a free Lifetime SSL certificate for your domain.

### 3. Environment Variables
If you decide to use paid API keys in the future (e.g., DeepL or Google Cloud), add them to a `.env.production` file and update `src/lib/api.ts` to reference `process.env`.

---
Created by Yash Dhanjwal
[www.yashdhanjwal.com](https://www.yashdhanjwal.com)
