# Theme guide

One theme file, formatted for easy editing.

```
themes/
  MangoDark-color-theme.json
```

## File structure

```json
{
  "name": "Mango Dark",
  "type": "dark",
  "colors": { ... },
  "tokenColors": [ ... ]
}
```

| Section | Purpose |
|---------|---------|
| `colors` | VS Code UI — sidebar, tabs, editor, status bar |
| `tokenColors` | Syntax highlighting — keywords, strings, comments, etc. |

## Color palette

### UI

| Purpose | Hex |
|---------|-----|
| Editor background | `#282C34` |
| Sidebar / panels | `#21252B` |
| Activity bar | `#333842` |
| Accent (cursor, focus, badges) | `#528BFF` |
| Default text | `#ABB2BF` |
| Selection | `#3E4451` |

### Syntax

| Token | Hex |
|-------|-----|
| Default | `#ABB2BF` |
| Comment | `#5C6370` |
| Keyword | `#C678DD` |
| String | `#98C379` |
| Function | `#61AFEF` |
| Variable | `#E06C75` |
| Number | `#D19A66` |
| Class / type | `#E5C07B` |

Full color reference: [VS Code Theme Color](https://code.visualstudio.com/api/references/theme-color)

## Test locally

1. Open this repo in VS Code or Cursor.
2. Press **F5**.
3. **Cmd+Shift+P → Preferences: Color Theme → Mango Dark**.
4. Edit the JSON and save — changes apply live.

## Editor defaults (Mango Dark)

Selecting this theme applies layout and typography defaults sourced from the [Atom editor](https://github.com/atom/atom) configuration:

| Setting | Value | Source |
|---------|-------|--------|
| `editor.fontFamily` | `Menlo, Consolas, 'DejaVu Sans Mono', monospace` | Atom `config-schema.js` |
| `editor.fontSize` | `14` | Atom default |
| `editor.lineHeight` | `1.5` | Atom default |
| `editor.minimap.enabled` | `false` | Cleaner editor |
| `workbench.activityBar.location` | `hidden` | More room for file tree |
| `editor.renderLineHighlight` | `line` | Subtle current-line band |
| `breadcrumbs.enabled` | `false` | Less chrome above code |

### File tree selection

Subtle gray bar on the selected file — same as when you're editing and the sidebar is unfocused:

| State | Background | Text |
|-------|------------|------|
| File selected | `#2C313A` | `#D7DAE0` / `#636D83` |

Also hides the **Open Editors** section (`explorer.openEditors.visible: 0`) so the sidebar is just the project tree, like classic editors.

### Important: your settings can override the theme

If font or spacing still looks wrong, check **Settings** for `editor.fontFamily`, `editor.fontSize`, and `editor.lineHeight`. User settings beat theme defaults — remove them or reset to use Mango Dark defaults.

`editor.semanticHighlighting.enabled` is set to **false** so syntax colors match the theme file exactly (VS Code semantic tokens otherwise recolor code).

## Inspect scopes

**Cmd+Shift+P → Developer: Inspect Editor Tokens and Scopes**

```json
{
  "name": "Keyword",
  "scope": ["keyword"],
  "settings": { "foreground": "#C678DD" }
}
```

Rules named `[VSCODE-CUSTOM]` are language-specific fixes for VS Code grammars.
