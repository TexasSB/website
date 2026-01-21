# Texas Science Bowl Website

Static site for Texas Science Bowl.

## GitHub Pages + Namecheap custom domain

This repo includes a `CNAME` file set to `texassciencebowl.org`.

### 1) Enable GitHub Pages

- In GitHub: **Repo → Settings → Pages**
- **Build and deployment**
  - **Source**: *Deploy from a branch*
  - **Branch**: `main` / `(root)`
- Set **Custom domain** to `texassciencebowl.org` (it should auto-detect from `CNAME`)
- Enable **Enforce HTTPS** after DNS is working.

### 2) Configure DNS in Namecheap

In Namecheap **Domain List → Manage → Advanced DNS**, add/update:

- **A records** (host `@`) pointing to GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

- **CNAME record** for `www`:
  - Host: `www`
  - Value: `<your-github-username>.github.io`
  - (Example: `texassciencebowl.github.io` if your username is `texassciencebowl`)

After it propagates, GitHub Pages will serve:
- `https://texassciencebowl.org`
- `https://www.texassciencebowl.org` (typically redirected to the apex)

### 3) Local preview

You can open `index.html` directly, or run a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

