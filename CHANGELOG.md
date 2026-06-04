# Changelog

Languages: [English](CHANGELOG.md) | [中文](CHANGELOG.zh-CN.md) | [日本語](CHANGELOG.ja.md)

All notable changes to HTMlore will be documented in this file.

The format is based on Keep a Changelog, and this project uses semantic
versioning after the initial public release.

## [Unreleased]

## [0.6.9] - 2026-06-04

### Changed

- Added a migration guide for deployments upgrading from the former project
  name to HTMlore.
- Cleaned up remaining sample and static asset references from the former
  project name after the HTMlore rename.
- Updated public homepage, demo README notes, app accessibility labels, and
  logo descriptions to use HTMlore's current library/lore wording.
- Routed the legacy `html-vault` console script through the compatibility
  wrapper so its help output keeps the legacy command name while using the
  `html_lore` implementation.
- Expanded `.env.example` with the local login/session and self-hosted
  multi-user data settings used by the default Docker deployment.
- Added a Docker image health check for the backend API.
- Added GitHub Actions CI for pytest, Playwright demo checks, and Docker
  Compose validation.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.9`.

## [0.6.8] - 2026-06-04

### Changed

- Moved the primary Python implementation package to `html_lore`.
- Updated package entry points, tests, API server launch paths, and Docker
  packaging to use the new `html_lore` namespace by default.
- Kept the legacy `html_vault` package as a thin compatibility shim for
  existing imports and old `uvicorn html_vault.server.app:app` launch paths.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.8`.

### Compatibility

- Existing `html_vault` imports and the legacy `html-vault` CLI remain
  supported during the 0.x compatibility window.

## [0.6.7] - 2026-06-04

### Added

- Added the new `html-lore` CLI entry point while keeping the legacy
  `html-vault` command available during the 0.x compatibility window.
- Added the `html_lore` public Python namespace as a compatibility entry that
  points to the existing implementation package.
- Added `HTML_LORE_*` runtime configuration names with fallback support for
  legacy `HTML_VAULT_*` environment variables.
- Added browser preference migration from `html-vault-*` localStorage keys to
  `html-lore-*` keys, without deleting the legacy keys.

### Changed

- Renamed the public product brand from HTMlore's former name to `HTMlore`
  across the app shell, login screen, PWA manifest, Pages site, static demo,
  README, deployment docs, and version metadata.
- Updated the default repository and release-check URLs to
  `JMoCoder/html_lore`.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.7`.

### Compatibility

- Existing `html_vault` Python imports, `html-vault` CLI commands,
  `HTML_VAULT_*` env variables, `html-vault-*` browser preferences, and
  `html-vault-backup` imports remain supported.

## [0.6.6] - 2026-06-03

### Changed

- Refined the sidebar profile area: the footer avatar now opens a compact user
  status popover with avatar, username, ID, subscription status, and AI credit
  balance instead of navigating away.
- Moved profile management controls into Settings > User profile, made the
  avatar itself the upload target, and aligned sign out on the same profile row.
- Smoothed collapsed sidebar behavior across the main workspace, reader, and
  settings overlays.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.6`.

## [0.6.5] - 2026-06-03

### Added

- Added file-backed self-hosted multi-user login support through
  `data/users.json`.
- Added per-user persistent notebook partitions under `data/users/<data_id>/`
  for each user's imported/generated HTML, metadata, runtime config, jobs, and
  generated public output.
- Added `html-lore user-add` for creating or replacing self-hosted users
  without storing plaintext passwords.
- Added backend integration coverage for env bootstrap, case-insensitive
  multi-user login, and cross-user upload isolation.

### Changed

- Default env credentials now bootstrap the first admin user into
  `users.json`; that bootstrap admin keeps the existing root notebook data for
  backwards compatibility.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.5`.

## [0.6.4] - 2026-06-03

### Changed

- Login usernames are now matched case-insensitively while passwords remain
  case-sensitive.
- Login sessions store and return the configured canonical username.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.4`.

## [0.6.3] - 2026-06-03

### Changed

- Increased the spacing and line stability of the import/create feedback row so
  messages such as `Imported {title}` no longer sit too close to the interaction
  form.
- Updated package, app, PWA, and demo cache versions to `0.6.3`.

## [0.6.2] - 2026-06-03

### Changed

- Promoted the built-in login flow to the stable `0.6.2` release.
- Default Docker now enables local/test login with `admin` / `test-password`
  and a development session secret so fresh deployments open the login screen.
- README and deployment docs now clearly require changing the default username,
  password, and session secret before public access.
- Updated package, app, PWA, demo, and homepage cache versions to `0.6.2`.

## [0.6.0] - 2026-06-03

### Added

- Added a standard login screen as the first workspace view when server-side
  authentication is configured.
- Added `/api/auth/status`, `/api/auth/login`, and `/api/auth/logout` with
  HttpOnly signed session cookies.
- Added environment-configured test-user credentials via
  `HTML_LORE_AUTH_USERNAME`, `HTML_LORE_AUTH_PASSWORD`, and
  `HTML_LORE_SESSION_SECRET`.
- Protected backend APIs, `manifest.json`, and note content files with either
  a valid API token or browser login session.
- Added backend integration tests for login, failed login, API protection, and
  static content protection.

### Changed

- Updated package, app, PWA, demo, and homepage cache versions to `0.6.0`.

## [0.5.3] - 2026-06-03

### Changed

- Changed the default workspace and static demo language fallback to English
  for first-time deployments, while preserving saved user preferences and
  homepage-to-demo language handoff.
- Updated package, app, PWA, demo, and homepage cache versions to `0.5.3`.

## [0.5.2] - 2026-06-03

### Added

- Added Playwright E2E coverage for the static demo layout and workspace logo
  navigation.
- Added configurable `HTML_LORE_PAGES_URL` support so workspace branding can
  open the public GitHub Pages homepage from the real app.

### Changed

- Demo workspace branding now returns to the static Pages homepage instead of
  staying inside the demo workspace.
- Updated package, app, PWA, demo, and homepage cache versions to `0.5.2`.

## [0.5.1] - 2026-06-02

### Added

- Added the GitHub Pages `docs/` static homepage and read-only demo.
- Added direct English, Chinese, and Japanese language switching for the public
  homepage.
- Added language handoff from the homepage to the demo with
  `demo/?lang=zh-CN`, `demo/?lang=en`, and `demo/?lang=ja`.
- Added language-specific demo manifests and full README/CHANGELOG HTML demo
  notes for each supported language.

### Changed

- Kept the demo explicitly static with backend auto-detection disabled.
- Updated demo cache-busting and service worker cache names so stale demo shells
  do not render outdated controls.
- Updated package, app, and PWA cache versions to `0.5.1`.

## [0.5.0] - 2026-06-02

### Changed

- Promoted the project to the first stable self-hosted notebook release.
- Rebuilt the English, Chinese, and Japanese README files around the full
  project vision, implemented 0.5.0 scope, current limits, deployment paths,
  security model, and roadmap.
- Updated package, app, and PWA cache versions to `0.5.0`.

## [0.4.14] - 2026-06-02

### Changed

- Changed the default Docker Compose path to a single-container self-hosted
  notebook deployment that serves both the frontend and `/api/*`.
- Moved Caddy Basic Auth into an optional public deployment example instead of
  requiring it for the default startup path.
- Simplified default Docker environment variables so local and LAN deployments
  can run without a generated `.env` file.

## [0.4.13] - 2026-06-02

### Added

- Added reusable self-hosted Docker deployment assets: `Dockerfile.api`,
  `compose.prod.yml`, `deploy/Caddyfile`, and a backend container entrypoint.
- Added runtime frontend `config.js` support so deployed sites can use
  same-origin API access without embedding backend tokens in browser code.
- Added `.dockerignore` and expanded deployment docs for self-hosted Docker
  startup, updates, backups, and rollback.

### Changed

- The initial production compose path used `compose.prod.yml`; the default
  compose path was later simplified in `0.4.14`.

## [0.4.12] - 2026-06-02

### Added

- Added `GET /api/version` for backend version and repository metadata.
- Settings > About now shows the running version and checks GitHub
  releases/tags for update availability.
- Update checks only show a hint and never auto-update the server.

## [0.4.11] - 2026-06-02

### Added

- Added persistent lightweight backend job records stored in
  `meta/config/jobs.json`.
- Added `POST /api/rebuild` and `GET /api/rebuild/{job_id}` for explicit
  rebuild execution and status lookup.
- Added `GET /api/uploads/{upload_id}` and upload `job_id` responses so HTML
  imports can be queried after completion.
- Added a full core API smoke test covering upload, list, metadata edit,
  search, content read, favorite, archive, unarchive, and permanent delete.
- Localhost frontends now default to `http://127.0.0.1:8787` for the backend
  API, enabling local notebook mode without inline script configuration.
- README now documents real local notebook startup with `data/content`,
  `data/meta`, the API server, and the static web server.
- Added reusable deployment security baseline docs and backend API token/CORS
  configuration for self-hosted production preparation.

## [0.4.10] - 2026-06-02

### Fixed

- Fixed a startup crash when a stale cached HTML shell loaded the newer import
  button script before the hidden import file input existed.
- The PWA service worker now prefers the network for navigation and asset GET
  requests, while keeping cached fallbacks for offline use.
- Updated app and PWA cache version to `0.4.10` so browsers request the fixed
  shell and script instead of reusing stale `0.4.9` assets.

## [0.4.9] - 2026-06-02

### Changed

- Archived item cards and reader pages no longer show metadata edit actions.
- `PATCH /api/items/{id}/metadata` now rejects archived items until they are
  unarchived.
- Archived items still allow favorite toggles, unarchive, and permanent delete.

## [0.4.8] - 2026-06-01

### Added

- Added `GET /api/search` with the same filtering and sorting parameters as
  `GET /api/items`.
- Search responses now include the matched item, score, matched fields, and a
  snippet, creating a stable interface for future Pagefind, SQLite FTS, or cloud
  search backends.
- Added service and real HTTP integration tests for search query, tag OR/AND,
  favorite filtering, Chinese text search, and result metadata.

## [0.4.7] - 2026-06-01

### Added

- Added `GET /api/navigation` and `PUT /api/navigation` for persisting sidebar
  visibility preferences for library views, collections, and tags.
- Navigation visibility settings are stored in `meta/config/navigation.json`.
- The frontend settings management page loads and saves navigation visibility
  through the backend when an Agent Server URL is configured, with local storage
  fallback in static mode.
- Added service and real HTTP integration tests for navigation configuration.

## [0.4.6] - 2026-06-01

### Added

- Added `PATCH /api/items/{id}/state` to persist `favorite` and `archived`
  state to YAML sidecar metadata.
- Favorite and archive buttons now write through the backend when an Agent
  Server URL is configured, with static-mode local overrides kept as fallback.
- Added service and real HTTP integration tests for archive/favorite state
  persistence and archive-view filtering.

## [0.4.5] - 2026-06-01

### Added

- Added `PATCH /api/items/{id}/metadata` to persist note title, summary,
  collection, and tags to YAML sidecar metadata.
- Metadata edits now rebuild `public/` and return the re-indexed item.
- The frontend metadata editor writes through the backend when an Agent Server
  URL is configured, with static-mode local overrides kept as fallback.
- Added service and real HTTP integration tests for metadata persistence.

## [0.4.4] - 2026-06-01

### Added

- Added backend content access endpoints: `GET /api/items/{id}/content` and
  `GET /api/items/{id}/raw`.
- Reader iframe and original-file links now use the backend content API when an
  Agent Server URL is configured, while static mode keeps using local content
  paths.
- Added real HTTP integration tests for item content and raw HTML access.

## [0.4.3] - 2026-06-01

### Added

- Archived item cards now replace the AI context button with a permanent
  delete action.
- Archived reader pages now replace the right-side AI button with a permanent
  delete action.
- Added `DELETE /api/items/{id}` for permanently deleting archived notes from
  `content/` and `meta/`, followed by a rebuild.

## [0.4.2] - 2026-06-01

### Added

- Added HTML import backend support with `POST /api/uploads/html`.
- Imported HTML files are saved under `content/imported/YYYY/MM/`, sidecar
  metadata is written under `meta/items/`, and the static site is rebuilt after
  a successful import.
- Added upload service tests covering HTML import, metadata generation, rebuild,
  and invalid file rejection.

## [0.4.1] - 2026-06-01

### Added

- Added the first backend development slice: optional Agent Server API skeleton,
  `GET /api/health`, `GET /api/manifest`, `GET /api/items`, and
  `GET /api/items/{id}`.
- `GET /api/items` supports current frontend list behavior for library,
  collection, tag OR/AND, favorite/archive, search, sort, and limit filters.
- Added `html-lore serve-api` and service/API tests for the item query layer.

### Fixed

- Updated the builder test expectation to match the current four-item example
  fixture.

## [0.4.0] - 2026-06-01

### Added

- Promoted the current UI to the first formal frontend release.
- Frontend now includes the card workspace, PWA app shell, trilingual UI,
  light/dark theme switching, resizable sidebars, global AI panel scaffold,
  settings modules, local backup/export scaffolds, item favorite/archive
  actions, and local note metadata editing.

### Changed

- Replaced the light-mode theme switch moon with a clearer filled moon-and-star
  icon and added cache-busting resource URLs for the frontend bundle.
- Package, app, and PWA cache version updated to `0.4.0`.

## [0.3.21] - 2026-05-30

### Added

- Item cards and the reader now include an edit metadata button before the
  favorite action.
- A local metadata editor can update note title, summary, collection, and tags
  with Save and Cancel controls. The overrides are stored in browser state and
  are reflected in cards, reader headers, search, filters, counts, sorting, and
  AI context labels.
- Package, app, and PWA cache version updated to `0.3.21`.

## [0.3.20] - 2026-05-30

### Fixed

- AI panel resizing on the reader page now follows the pointer consistently by
  ignoring the reader iframe during drag and calculating width from the actual
  panel boundary.
- Package, app, and PWA cache version updated to `0.3.20`.

## [0.3.19] - 2026-05-30

### Changed

- Collapsed sidebar is narrower and uses a smaller logo mark.
- Top filter popover now filters tags only; collection filtering remains a
  left-navigation action.
- Light/dark theme toggle moved back beside the sidebar Settings button with
  icon-only switching.
- Basic settings now labels the theme area as Theme settings and reserves it
  for future theme-color controls.
- Package, app, and PWA cache version updated to `0.3.19`.

## [0.3.18] - 2026-05-30

### Changed

- Sidebar branding now always shows `HTMlore` and removes the item-count
  subtitle.
- Sidebar and AI-panel resize rails no longer show hover/drag highlight lines.
- Reader actions now use icon buttons for original/copy, keep the AI button on
  the far right, and let that button toggle the AI panel open/closed.
- Reader headers now clamp title, summary, and tags to keep the header height
  stable as the AI panel width changes.
- Package, app, and PWA cache version updated to `0.3.18`.

## [0.3.17] - 2026-05-30

### Changed

- Sidebar scroll indicator now shares the resize rail so the nav labels no
  longer shift when the sidebar is focused.
- Archive is now confirm-first, hidden from collections/tags by default, and
  counted only inside the archived library view while preserving metadata.
- The top toolbar keeps only favorites in the filter/sort group, and the reader
  action row now uses a share button plus a direct AI-panel entry.
- Package, app, and PWA cache version updated to `0.3.17`.

## [0.3.16] - 2026-05-29

### Added

- Top toolbar now has a dedicated colored `+` import button with an HTML import
  tooltip, and the old sidebar import button was removed.
- Library, Collections, and Tags sidebar sections can be collapsed and expanded.
- Reader actions now include add/remove from AI Q&A context and a share button.

### Changed

- Updated the sidebar brand mark to the redesigned HTMlore icon and refined
  brand/collapse-button alignment for light and dark themes.
- Sidebar and page scrollbars now stay hidden until hover or keyboard focus.
- AI-create source selector now uses an inset custom chevron so the arrow no
  longer touches the right border.
- Package, app, and PWA cache version updated to `0.3.16`.

## [0.3.15] - 2026-05-29

### Changed

- Removed the workspace title from the top toolbar to avoid wrapping on
  smaller screens with side panels open.
- Removed the view-mode toggle and forced the workspace to stay in card view.
- Top toolbar now groups the five control buttons separately from the
  search/AI group, allowing the search/AI group to wrap together when narrow.
- AI panel generation action now reads "Generate note".
- Package, app, and PWA cache version updated to `0.3.15`.

## [0.3.14] - 2026-05-29

### Added

- GitHub sidebar link now includes the GitHub mark.
- Basic settings theme control now offers System, Light, and Dark modes.

### Changed

- Theme preference now stores the selected mode and resolves System from the
  browser color-scheme preference.
- Package, app, and PWA cache version updated to `0.3.14`.

## [0.3.13] - 2026-05-29

### Added

- GitHub repository link in the lower-right side of the sidebar footer.
- Basic settings section for interface theme and language preferences.

### Changed

- Sidebar footer now keeps Settings on the left and removes theme/language
  controls from the persistent navigation.
- User-related settings now appear first: Basic settings, User profile, and
  Account & security.
- Package, app, and PWA cache version updated to `0.3.13`.

## [0.3.12] - 2026-05-29

### Changed

- Top toolbar grouping now pairs filter with sort, and favorite with archive.
- Verified OR/AND tag filtering against MCP and Docker sample notes: OR returns
  any matching tag, while AND requires all selected tags.
- Package, app, and PWA cache version updated to `0.3.12`.

## [0.3.11] - 2026-05-29

### Changed

- Opening the AI panel no longer changes the top toolbar into a wrapped
  multi-row layout.
- The global AI button remains visible to the right of search while the panel
  is open, preserving the search/AI button relationship.
- Package, app, and PWA cache version updated to `0.3.11`.

## [0.3.10] - 2026-05-29

### Changed

- Manual AI context card action now changes from plus to minus when selected
  while keeping the active icon color.
- Filter and sort toolbar controls are separated into independent groups again.
- Tag match controls now use OR/AND wording, matching the underlying any/all
  tag filter logic.
- Package, app, and PWA cache version updated to `0.3.10`.

## [0.3.9] - 2026-05-29

### Changed

- Card metadata now stays in the upper-left top row beside the card action
  icons, while titles start on the next row.
- List view layout separates action icons, read/original buttons, and date to
  prevent overlap.
- The AI panel now slides out from the right edge and uses the same resize
  highlight behavior as the left sidebar.
- Package, app, and PWA cache version updated to `0.3.9`.

## [0.3.8] - 2026-05-29

### Added

- Card actions now include an add-to-Q&A-context button for manually selecting
  multiple files as the AI context.

### Changed

- Manual AI context selections now override the default page, reader, and
  filter-derived context labels.
- The top AI button hides while the AI panel is open, leaving the panel close
  button as the single close control.
- Filter and sort buttons now share one toolbar group.
- Package, app, and PWA cache version updated to `0.3.8`.

## [0.3.7] - 2026-05-29

### Changed

- Sidebar resize handle no longer creates a horizontal scrollbar.
- Multi-filter popover now uses the header area for Any/All tag match controls.
- Card action buttons no longer reserve a top layout row, keeping collection,
  source, and date visually anchored in the lower-left area.
- Package, app, and PWA cache version updated to `0.3.7`.

## [0.3.6] - 2026-05-29

### Added

- User profile and account/security placeholder sections in settings.

### Changed

- Filter and sort toolbar controls are now visually separated.
- Card metadata now shows collection/source and date in the lower-left area,
  while favorite/archive actions stay in the upper-right.
- Source labels are normalized to generated/imported system labels.
- Removed the Needs Review library view; notes are categorized by source
  instead of a review queue.
- Settings title now reads simply as Settings, and data settings appear before
  AI settings.
- Package, app, and PWA cache version updated to `0.3.6`.

## [0.3.5] - 2026-05-29

### Added

- Tag multi-select filters now support Any and All match modes.
- Added an example note with both MCP and Docker tags for combined-tag
  filtering coverage.

### Changed

- Library navigation clears collection/tag multi-select limits, treating
  library views as all collections and all tags within that library.
- The multi-filter "All" action now resets collection/tag limits.
- Package, app, and PWA cache version updated to `0.3.5`.

## [0.3.4] - 2026-05-29

### Added

- Sort menu in the result filter group for newest, oldest, title A-Z, and
  title Z-A ordering of the current view.

### Changed

- Package, app, and PWA cache version updated to `0.3.4`.

## [0.3.3] - 2026-05-29

### Added

- Resizable left sidebar width with local persistence.
- Multi-select collection and tag filter popover in the top toolbar, including
  a clear-all action.
- AI context labels now include library views, favorite-only state, archive
  visibility state, and active multi-select filters.

### Changed

- Clicking a collection or tag while multi-select filters are active now syncs
  the matching multi-select group.
- Package, app, and PWA cache version updated to `0.3.3`.

## [0.3.2] - 2026-05-29

### Added

- Global AI assistant button beside search.
- Resizable right AI sidebar with context labels for all notes, collection,
  tag, search, and reader states.
- Placeholder chat and HTML note generation actions for the future Agent
  Server.

### Changed

- Multi-turn knowledge conversation planning moved out of settings and into
  the global AI sidebar.
- Package, app, and PWA cache version updated to `0.3.2`.

## [0.3.1] - 2026-05-29

### Changed

- Compact list-view rows by moving the read/original actions up to align with the tag row.
- Package, app, and PWA cache version updated to `0.3.1`.

## [0.3.0] - 2026-05-29

### Added

- Favorite-only toolbar filter beside the archive filter.
- Archive filter now starts enabled so archived items are excluded by default.

### Changed

- Archive filter tooltip now reads as an action to show archived items while the filter is active.
- Toolbar filters use icon color for state instead of adding a highlighted frame.
- Package, app, and PWA cache version updated to `0.3.0`.

## [0.1.0] - 2026-05-29

### Added

- Initial static-first HTMlore MVP.
- Manifest v2 builder for HTML knowledge items.
- Sidecar YAML metadata support.
- Karakeep-style card workspace with sidebar filters.
- Static reader pane with iframe and original-open actions.
- New knowledge item entry card with optional Agent API handoff.
- Example content, tests, Docker static image, README, MIT license.

## [0.2.0] - 2026-05-29

### Added

- Extensible frontend i18n dictionary.
- Language selector for Chinese, English, and Japanese system UI labels.
- Persistent language preference via `localStorage`.
- Dark and light theme toggle with a compact icon control.
- Settings page with AI provider configuration, user agreement, about, and
  update documentation sections.
- Collection and tag management sections with sidebar visibility controls and
  disabled structural actions for future metadata writing.
- Library management section for fixed system view visibility.
- AI knowledge assistant placeholder with operation selection, prompt input,
  and a second confirmation before future database-impacting jobs.
- Global AI sidebar placeholder for future multi-turn conversations over
  knowledge base files.
- Magic-wand "I'm feeling lucky" action for opening a random matching item.
- Archived library view for future archive workflows.
- Favorite and archive icon actions on cards and in the reader.
- Card/list workspace view toggle.
- Separate data settings group for local backup and restore, automatic backup
  snapshots, WebDAV settings, and JSON exports.
- PWA manifest and service worker for browser installation and app-shell
  caching.
- Toolbar archive filter for excluding archived items from the current result
  view.

### Changed

- System UI copy is now rendered from translation keys while user-created
  content such as item titles, collections, and tags remains unchanged.
- Language selection now lives at the bottom of the sidebar.
- API keys are explicitly excluded from browser storage; static mode only saves
  non-sensitive AI model preferences.
- Settings header icon buttons are grid-centered for consistent visual
  alignment.
- AI provider settings are visually separated from sidebar management and
  project information sections.
- Sidebar import entry is separated from the AI creation entry.
- Logo and sidebar navigation now consistently return from settings or reader
  overlays to the main workspace.
- Manifest items now include an `archived` metadata flag.
- Card and list layouts now reserve stable areas for title, summary, tags, and
  actions so long summaries truncate instead of hiding controls.
