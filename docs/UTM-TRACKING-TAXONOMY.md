# Fenix Flooring — UTM Tracking Taxonomy

> Master reference for all UTM parameters, campaign naming conventions, and branded short links used across Fenix Flooring marketing channels.

---

## 1. UTM Parameter Definitions

| Parameter       | Purpose                                         | Example Values                        |
| --------------- | ----------------------------------------------- | ------------------------------------- |
| `utm_source`    | Where the traffic originates                    | `linkedin`, `website`, `google`       |
| `utm_medium`    | The marketing medium / channel type             | `organic_social`, `owned`, `cpc`      |
| `utm_campaign`  | The specific campaign or initiative             | `website_launch`, `high_end_residential` |
| `utm_content`   | Distinguishes creative or placement within a campaign | `comment_link`, `footer`, `contact_page` |
| `utm_term`      | (Optional) Paid search keyword                  | —                                     |

---

## 2. Naming Conventions

- All UTM values are **lowercase**.
- Use **underscores** (`_`) to separate words within a parameter value (e.g., `organic_social`).
- Use **hyphens** (`-`) in URL path slugs (e.g., `/go/linkedin/website-launch`).
- Campaign slugs should be short but descriptive.
- Never include PII (emails, names) in UTM parameters.

---

## 3. Channel Taxonomy

### 3a. LinkedIn (Organic Social)

| Parameter      | Value              |
| -------------- | ------------------ |
| `utm_source`   | `linkedin`         |
| `utm_medium`   | `organic_social`   |

### 3b. Website (Owned — outbound tracking from fenixflooring.com)

| Parameter      | Value     |
| -------------- | --------- |
| `utm_source`   | `website` |
| `utm_medium`   | `owned`   |

Used when tracking clicks from fenixflooring.com to external destinations (e.g., LinkedIn company page link in the footer or contact page).

---

## 4. Branded Short Links (First-Comment Links)

### What they are

Branded short links live under `fenixflooring.com/go/…` and 302-redirect to the full UTM-tracked URL. They are designed to be:

- **Short and clean** — suitable for LinkedIn comments, bios, and posts where long URLs look spammy.
- **Branded** — always on the fenixflooring.com domain (no third-party shortener).
- **Trackable** — each link carries a unique UTM campaign so you can see exactly which initiative drove the click in GA4.

### When to use

- **LinkedIn first-comment links**: Post the short URL in your first comment on a LinkedIn post to drive traffic back to the website while keeping the comment clean.
- **LinkedIn bio / featured links**: Use the generic `/go/linkedin` for an always-on company page link.
- **Any branded social CTA**: Wherever you need a clean link that redirects with UTM tracking.

> **Important**: In LinkedIn comments, always use the **short URL** (e.g., `fenixflooring.com/go/linkedin/website-launch`), never the raw UTM URL.

### Mapping Table

| Channel  | Short URL                                          | Redirect Target (full UTM URL)                                                                                                            | `utm_source` | `utm_medium`     | `utm_campaign`               | `utm_content`  | When to Use                                          |
| -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------- | ---------------------------- | -------------- | ---------------------------------------------------- |
| LinkedIn | `fenixflooring.com/go/linkedin`                    | `https://www.fenixflooring.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=linkedin_company_page&utm_content=comment_link` | `linkedin`   | `organic_social` | `linkedin_company_page`      | `comment_link` | Generic LinkedIn comment link (always-on)            |
| LinkedIn | `fenixflooring.com/go/linkedin/website-launch`     | `https://www.fenixflooring.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=website_launch&utm_content=comment_link`        | `linkedin`   | `organic_social` | `website_launch`             | `comment_link` | Website-launch campaign comments                     |
| LinkedIn | `fenixflooring.com/go/linkedin/communication-fast` | `https://www.fenixflooring.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=communication_fast_response&utm_content=comment_link` | `linkedin`   | `organic_social` | `communication_fast_response`| `comment_link` | Fast-communication / responsiveness campaign         |
| LinkedIn | `fenixflooring.com/go/linkedin/high-end-residential` | `https://www.fenixflooring.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=high_end_residential&utm_content=comment_link`  | `linkedin`   | `organic_social` | `high_end_residential`       | `comment_link` | High-end residential flooring campaign               |

### Path Naming Convention

```
/go/<channel>/<campaign-slug>
```

- **Channel**: `linkedin`, `instagram`, `facebook`, etc.
- **Campaign slug**: lowercase with hyphens (e.g., `website-launch`, `high-end-residential`).
- `utm_content` defaults to `comment_link` unless there's a reason to differentiate (e.g., `bio_link`, `post_cta`).

### Adding a New Short Link

1. Choose the campaign slug following the naming convention above.
2. Add two `[[redirects]]` blocks to `netlify.toml` (with and without trailing slash):
   ```toml
   [[redirects]]
     from = "/go/linkedin/<campaign-slug>"
     to = "https://www.fenixflooring.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=<campaign_name>&utm_content=comment_link"
     status = 302
     force = true

   [[redirects]]
     from = "/go/linkedin/<campaign-slug>/"
     to = "https://www.fenixflooring.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=<campaign_name>&utm_content=comment_link"
     status = 302
     force = true
   ```
3. Update the mapping table in this document.
4. Deploy and verify with `curl -I https://www.fenixflooring.com/go/linkedin/<campaign-slug>`.

### Redirect Status Code: 302 vs 301

- **302 (current)**: Temporary redirect. Browsers and CDNs do not cache the target URL. Safe to change the destination at any time. Use while validating.
- **301 (future)**: Permanent redirect. Browsers and search engines cache aggressively. Better for SEO link equity. Only switch after confirming the target URLs are final.

---

## 5. Outbound Social Links (from fenixflooring.com)

These are links on our website that send visitors to our social profiles. They use `utm_source=website` and `utm_medium=owned` to track the outbound click in GA4 before the user leaves.

| Placement    | URL on site                                    | Destination                                              | `utm_source` | `utm_medium` | `utm_campaign`         | `utm_content`  |
| ------------ | ---------------------------------------------- | -------------------------------------------------------- | ------------ | ------------ | ---------------------- | -------------- |
| Footer       | `/go/to-linkedin/?utm_source=website&utm_medium=owned&utm_campaign=social_profile_click&utm_content=footer` | `https://www.linkedin.com/company/fenix-flooring/` | `website`    | `owned`      | `social_profile_click` | `footer`       |
| Contact page | `/go/to-linkedin/?utm_source=website&utm_medium=owned&utm_campaign=social_profile_click&utm_content=contact_page` | `https://www.linkedin.com/company/fenix-flooring/` | `website`    | `owned`      | `social_profile_click` | `contact_page` |

---

## 6. Existing Redirect Rules (netlify.toml)

For reference, the following redirect rules exist in `netlify.toml`:

| Rule                            | Purpose                                             | Status |
| ------------------------------- | --------------------------------------------------- | ------ |
| `/* → www` (Host: fenixflooring.com) | Non-www to www canonicalization                | 301    |
| Netlify subdomain `→ www`       | Block Netlify `.netlify.app` from being indexed     | 301    |
| `/utm_source=*`                 | Fix malformed UTM links (missing `?`)               | 301    |
| `/go/linkedin*` (4 paths)       | Branded short links (see Section 4)                 | 302    |
| `/resources/commercial-flooring-cost-guide/` | Legacy URL redirect to updated slug   | 301    |
