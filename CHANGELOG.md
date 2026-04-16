# Changelog

All notable changes to this project will be documented here.

This project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2025

### Breaking Changes

This release is a full rewrite and rename of the original `use-nigeria-location` package. If you are migrating from that package, see the [Migration Guide](#migration-guide) below.

### Changed

- **Package renamed** from `use-nigeria-location` to `nigeria-locations`
- **All functions renamed** — the `use` prefix has been dropped in favour of `get`, and abbreviations have been expanded for clarity:

  | Before (`use-nigeria-location`) | After (`nigeria-locations`) |
  |---|---|
  | `useAllStatesInfo` | `getAllStatesInfo` |
  | `useAllStates` | `getAllStates` |
  | `useStateInfo` | `getStateInfo` |
  | `useSingleState` | `getState` |
  | `useStateCapital` | `getStateCapital` |
  | `useStateLandMass` | `getStateLandMass` |
  | `useStateGeoPoli` | `getStateGeoPoliticalZone` |
  | `useStateLGAs` | `getStateLGAs` |
  | `useSingleLGA` | `getLGA` |
  | `useStateUnis` | `getStateUniversities` |
  | `useStateAirports` | `getStateAirports` |

- **`package.json`**: Added `exports` field for proper ESM/CJS resolution in modern bundlers (Vite, webpack 5, Node ESM). Added `files` field to explicitly control what ships to npm.
- **`tsconfig.json`**: Target updated to `ES2020` for broader runtime compatibility. Module resolution changed to `bundler`.
- **`tsup.config.ts`**: Target aligned to `ES2020`. Added `sourcemap` and `treeshake`.
- **Error messages** improved — clearer wording on not-found responses.
- **`LICENSE`**: Copyright year updated to 2025.

### Added

- **Name-based lookup** — all functions that previously required a UUID now accept either a UUID or a plain name (e.g. `"Lagos"`). Input is sanitized internally: leading/trailing whitespace is stripped and casing is ignored, so `"  LAGOS  "`, `"lagos"`, and `"Lagos"` all resolve correctly.
- **`getLGA` now supports name lookup** — `getLGA("Abia", "Aba South")` works in addition to the UUID form.
- **Test suite** — full vitest test coverage across all exported functions, covering ID lookup, name lookup, casing variants, whitespace handling, and not-found paths.
- **`CHANGELOG.md`** — this file.

### Fixed

- **`getLGA` (previously `useSingleLGA`) was always returning `undefined`** — the `.find()` callback was missing a `return` statement, meaning every lookup silently failed regardless of input. This is now fixed.

---

## Migration Guide

### 1. Uninstall the old package and install the new one

```bash
npm uninstall use-nigeria-location
npm install nigeria-locations
```

### 2. Update your imports

```ts
// Before
import { useAllStates, useStateCapital, useSingleLGA } from "use-nigeria-location";

// After
import { getAllStates, getStateCapital, getLGA } from "nigeria-locations";
```

### 3. Update function calls — signatures are the same, names changed

```ts
// Before
useStateCapital("3ac495b8-4196-4126-bf9e-bb8d43a0355d")

// After — ID still works
getStateCapital("3ac495b8-4196-4126-bf9e-bb8d43a0355d")

// After — name also works now
getStateCapital("Adamawa")
```

### 4. Note: `getLGA` bug fix may change behaviour

If your code was calling `useSingleLGA` and handling the `undefined` / fallback string result, note that `getLGA` now correctly returns the matched LGA object. Your not-found handling logic is still valid — but lookups that previously always failed will now succeed.
