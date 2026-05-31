# Publish to VS Code Marketplace

Pushing to GitHub does **not** publish automatically until you add a secret (one-time setup).

## One-time setup (~3 minutes)

### 1. Create a Personal Access Token

1. Open https://marketplace.visualstudio.com/manage/publishers/sanjeevkse
2. Click **Personal Access Tokens** (or go to https://dev.azure.com → User settings → PATs)
3. **New Token**
   - Name: `mango-theme-publish`
   - Organization: **All accessible organizations**
   - Expiration: 90 days or custom
   - Scopes: **Custom defined** → check **Marketplace** → **Manage**
4. **Create** and copy the token (you only see it once)

### 2. Add token to GitHub

1. Open https://github.com/sanjeevkse/the-mango-theme/settings/secrets/actions
2. **New repository secret**
   - Name: `VSCE_PAT`
   - Value: paste your token
3. **Add secret**

## Publish (no terminal needed)

1. Open https://github.com/sanjeevkse/the-mango-theme/actions/workflows/publish.yml
2. Click **Run workflow** → **Run workflow**
3. Wait ~1 minute — extension appears on the [Marketplace](https://marketplace.visualstudio.com/items?itemName=sanjeevkse.the-mango-theme)

## Before each publish

Bump version in `package.json` (e.g. `1.0.1` → `1.0.2`), commit, push, then run the workflow.

## Troubleshoot

| Error | Fix |
|-------|-----|
| `PAT expired` | Create a new token and update `VSCE_PAT` secret |
| `not authorized` | Token must have **Marketplace → Manage** scope |
| `Version already exists` | Bump `version` in `package.json` |
