# Changelog

All notable changes to HTML Vault will be documented in this file.

The format is based on Keep a Changelog, and this project uses semantic
versioning after the initial public release.

## [0.1.0] - 2026-05-29

### Added

- Initial static-first HTML Vault MVP.
- Manifest v2 builder for HTML knowledge items.
- Sidecar YAML metadata support.
- Karakeep-style card workspace with sidebar filters.
- Static reader pane with iframe and original-open actions.
- New knowledge item entry card with optional Agent API handoff.
- Example content, tests, Docker static image, README, MIT license.

## [0.1.1] - 2026-05-29

### Added

- Extensible frontend i18n dictionary.
- Language selector for English and Chinese system UI labels.
- Persistent language preference via `localStorage`.
- Dark and light theme toggle with a compact icon control.

### Changed

- System UI copy is now rendered from translation keys while user-created
  content such as item titles, collections, and tags remains unchanged.
- Language selection now lives at the bottom of the sidebar.
