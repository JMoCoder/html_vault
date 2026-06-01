# Changelog

Languages: [English](CHANGELOG.md) | [中文](CHANGELOG.zh-CN.md) | [日本語](CHANGELOG.ja.md)

All notable changes to HTML Vault will be documented in this file.

The format is based on Keep a Changelog, and this project uses semantic
versioning after the initial public release.

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

- Sidebar branding now always shows `HTMLvault` and removes the item-count
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

- Updated the sidebar brand mark to the redesigned HTMLvault icon and refined
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

- Initial static-first HTML Vault MVP.
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
