# Change Log

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

## [0.1.2] - 2023-05-20

Added minor improvements to the dashboard.

### Added

- Display the popularity on the top artists
- Display the "unknown" artists
- Display the index on the carousel's items

### Changed

- The Spinner is now at the center of the page
- Pooling interval for the user

### Fixed

- Fixed a layout bug that could occur when the page has no content
- Error on the Redux Persistor
- key error on the recently played songs

## [0.1.1] - 2023-05-19

Fixed some bugs and improved the dashboard.

### Added

- Display the current time range
- Added a title for the carousel for more clarity and accessibility
- Added the CHANGELOG.md file
- Added SEO tags
- Added a favicon
- Type of the get user query

### Changed

- Improve accessibility of the dashboard
- Improve performance of the dashboard
- Disable the loop mode for more clarity
- Default to 404 for not currently supported pages instead of rendering a component
- Dynamic import of the components for better performance

### Fixed

- Callback after signing in and signing out
- Removed non necessaries scopes at the authentication
- Added auto pooling on the get User for preventing error on the dashboard

## [0.1.0] - 2023-05-18

Release of the dashboard and the landing page.

### Added

- Landing page: Provides a brief description of the application and its features.
- Dashboard: Displays favorite music genres, top artists, and current songs.
