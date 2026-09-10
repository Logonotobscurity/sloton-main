# LOG_ON design tokens

Three tiers. Change a semantic name; components follow.

## 1. Primitive

Hex only. No UI meaning.

| Token | Value |
|---|---|
| `--color-teal-700` | `#006B4D` |
| `--color-forest-900` | `#123320` |
| `--color-paper-100` | `#F4ECDE` |
| `--color-paper-50` | `#FFFDF7` |
| `--color-pulse-400` | `#C9F24A` |
| `--color-coral-500` | `#E8552F` |
| `--color-lavender-300` | `#C2A4DE` |
| `--space-1` … `--space-16` | 4px base scale |
| `--font-size-xs` … `--font-size-3xl` | rem / clamp |

## 2. Semantic

| Token | Role |
|---|---|
| `--color-action` | Links, focus, primary buttons (teal) |
| `--color-text` / `--color-text-muted` | Body |
| `--color-emphasis` | One italic per headline (coral) |
| `--color-pulse` | Highlight pills only |
| `--color-bg-band` | Verdara section paper |
| `--color-bg-canvas` | Lavender page field |

Shadcn `--primary` stays teal HSL so `bg-primary` stays AA.

## 3. Component

`--card-bg`, `--card-border`, `--card-radius`, `--button-bg`.

Verdara sections use these via `.verdara-*` classes.
