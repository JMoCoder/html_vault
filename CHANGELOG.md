# Changelog

Languages: [English](CHANGELOG.md) | [中文](CHANGELOG.zh-CN.md) | [日本語](CHANGELOG.ja.md)

All notable changes to HTML Vault will be documented in this file.

The format is based on Keep a Changelog, and this project uses semantic
versioning after the initial public release.

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
