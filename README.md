# Mafia Club — Rules Guide

Interactive rules site for **rules.secretmafiaclub.com**, styled to match [secretmafiaclub.com](https://www.secretmafiaclub.com).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Netlify → rules.secretmafiaclub.com

### 1. Push to GitHub

Create a new empty GitHub repo (e.g. `mafia-rules`), then from this folder:

```bash
git add .
git commit -m "Mafia Club interactive rules guide"
git remote add origin https://github.com/YOUR_USER/mafia-rules.git
git branch -M main
git push -u origin main
```

### 2. Create the Netlify site

1. Open [app.netlify.com](https://app.netlify.com) (same account as the invite site).
2. **Add new site → Import an existing project** → GitHub → pick `mafia-rules`.
3. Build settings should already match `netlify.toml`:
   - Build command: `npm run build`
   - Node: `22`
4. Click **Deploy site**.
5. Open the `*.netlify.app` URL and confirm the guide works.

### 3. Add the custom domain

1. In the Netlify site: **Domain management → Add a domain** → `rules.secretmafiaclub.com`.
2. Netlify will show DNS instructions. Usually you add a **CNAME** at your DNS host:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `rules` | `YOUR-SITE-NAME.netlify.app` |

(Use the exact hostname Netlify shows.)

3. Wait for DNS to propagate. Netlify provisions HTTPS automatically.

### 4. Point the main site at it

On the Wix site, change **LEARN THE RULES** to:

`https://rules.secretmafiaclub.com`

## Editing content

- Rules copy: `src/lib/rules.ts`
- Photos: `public/images/` (see that folder’s README)
