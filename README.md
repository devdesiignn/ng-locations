# ng-locations

> A zero-dependency TypeScript library for querying Nigerian states, LGAs, universities, airports, land mass, and geo-political zones. Works anywhere JavaScript runs — Node.js, React, Vue, Svelte, or plain JS.

[![npm version](https://img.shields.io/npm/v/ng-locations)](https://www.npmjs.com/package/ng-locations)
[![license](https://img.shields.io/npm/l/ng-locations)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Install

```bash
npm install ng-locations
# or
yarn add ng-locations
# or
pnpm add ng-locations
```

---

## Key Features

- **Search by name or ID** — pass a state name like `"Lagos"` or its UUID interchangeably
- **Input sanitization** — leading/trailing spaces and casing are handled automatically, so `"  lagos  "`, `"LAGOS"`, and `"Lagos"` all work
- **Full TypeScript support** — all functions and return types are fully typed
- **Zero dependencies** — no external packages required
- **Framework-agnostic** — works in Node.js, React, Vue, Svelte, or any JS environment
- **Dual package** — ships as both ESM and CommonJS

---

## Usage

### Lookup by name or ID

All functions that take a state or LGA identifier accept either the **name** or the **UUID**. Input is sanitized internally (trimmed and lowercased), so any casing or extra spaces work fine.

```ts
import { getStateCapital } from "ng-locations";

getStateCapital("Lagos")                              // "Ikeja"
getStateCapital("lagos")                              // "Ikeja"
getStateCapital("  LAGOS  ")                          // "Ikeja"
getStateCapital("3ac495b8-4196-4126-bf9e-bb8d43a0355d") // "Yola"
```

---

### Get all states info

```ts
import { getAllStatesInfo } from "ng-locations";

getAllStatesInfo();
// => [
//   {
//     name: "Abia",
//     capital: "Umuahia",
//     id: "2e14a7ed-349a-44f6-9e12-abfec3e5f6ed",
//     lgas: [...],
//     land_mass: "6,320 km²",
//     universities: [...],
//     airports: [],
//     geopolitical_zone: "South East",
//   },
//   ...
// ]
```

### Get all states (name + ID only)

```ts
import { getAllStates } from "ng-locations";

getAllStates();
// => [
//   { name: "Abia", id: "2e14a7ed-349a-44f6-9e12-abfec3e5f6ed" },
//   { name: "Adamawa", id: "3ac495b8-4196-4126-bf9e-bb8d43a0355d" },
//   ...
// ]
```

### Get full info for a single state

```ts
import { getStateInfo } from "ng-locations";

getStateInfo("Lagos");
// => { name: "Lagos", capital: "Ikeja", id: "...", lgas: [...], ... }

getStateInfo("not-a-state");
// => "State not found. Check the ID or name passed."
```

### Get a state (name + ID only)

```ts
import { getState } from "ng-locations";

getState("Lagos");
// => { name: "Lagos", id: "..." }
```

### Get capital of a state

```ts
import { getStateCapital } from "ng-locations";

getStateCapital("Ogun"); // => "Abeokuta"
```

### Get land mass of a state

```ts
import { getStateLandMass } from "ng-locations";

getStateLandMass("Rivers"); // => "11,077 km²"
```

### Get geo-political zone of a state

```ts
import { getStateGeoPoliticalZone } from "ng-locations";

getStateGeoPoliticalZone("Kano"); // => "North West"
```

### Get all LGAs in a state

```ts
import { getStateLGAs } from "ng-locations";

getStateLGAs("Abia");
// => [
//   { name: "Aba South", id: "4c840cb1-..." },
//   { name: "Arochukwu", id: "f46f5f01-..." },
//   ...
// ]
```

### Get a single LGA

```ts
import { getLGA } from "ng-locations";

// By state name + LGA name
getLGA("Abia", "Aba South");
// => { name: "Aba South", id: "4c840cb1-8f58-40d3-9aff-5a3b77fdba71" }

// By state ID + LGA ID
getLGA("2e14a7ed-...", "4c840cb1-...");
// => { name: "Aba South", id: "4c840cb1-..." }

// Mixed is also fine
getLGA("Abia", "4c840cb1-...");
// => { name: "Aba South", id: "4c840cb1-..." }
```

### Get all universities in a state

```ts
import { getStateUniversities } from "ng-locations";

getStateUniversities("Abia");
// => [
//   { name: "Abia State University", location: "Uturu", type: "State" },
//   { name: "Michael Okpara University of Agriculture", location: "Umudike", type: "Federal" },
// ]
```

### Get all airports in a state

```ts
import { getStateAirports } from "ng-locations";

getStateAirports("Lagos");
// => [
//   { name: "Murtala Muhammed International Airport", IATA_code: "LOS", type: "International" },
// ]
```

---

## API Reference

All functions return the result directly or a `string` error message when the lookup fails.

| Function | Parameters | Returns |
|---|---|---|
| `getAllStatesInfo()` | — | `TStateInfo[]` |
| `getAllStates()` | — | `TState[]` |
| `getStateInfo(idOrName)` | `string` | `TStateInfo \| string` |
| `getState(idOrName)` | `string` | `TState \| string` |
| `getStateCapital(idOrName)` | `string` | `string` |
| `getStateLandMass(idOrName)` | `string` | `string` |
| `getStateGeoPoliticalZone(idOrName)` | `string` | `string` |
| `getStateLGAs(idOrName)` | `string` | `TLGA[] \| string` |
| `getLGA(stateIdOrName, lgaIdOrName)` | `string, string` | `TLGA \| string` |
| `getStateUniversities(idOrName)` | `string` | `TUniversity[] \| string` |
| `getStateAirports(idOrName)` | `string` | `TAirport[] \| string` |

### Types

```ts
type TStateInfo = {
  name: string;
  capital: string;
  id: string;
  lgas: TLGA[];
  land_mass: string;
  universities: TUniversity[];
  airports: TAirport[];
  geopolitical_zone: string;
};

type TState = { name: string; id: string };

type TLGA = { name: string; id: string };

type TUniversity = { name: string; location: string; type: string };

type TAirport = { name: string; IATA_code: string; type: string };
```

---

## CommonJS usage

```js
const { getAllStates, getStateCapital } = require("ng-locations");
```

---

## License

MIT © [Muiz Haruna](https://github.com/devdesiignn)
