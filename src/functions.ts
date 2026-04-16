/**
 * @author Muiz Haruna (devdesiignn) <hmuiyze@gmail.com>
 * @package ng-locations
 */

import { TState, TLGA, TStateInfo, TUniversity, TAirport } from "@/types";
import { NigeriaLocations } from "@/data/ng-locations";

/**
 * Sanitizes a lookup key — trims whitespace and lowercases.
 * Applied to all user-supplied IDs and names before matching.
 */
function sanitize(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * @function findState
 * Internal helper. Matches a state by either its UUID or its name (case-insensitive, whitespace-trimmed).
 *
 * @param {string} idOrName - A state UUID or state name.
 * @returns {TStateInfo | undefined}
 */
function findState(idOrName: string): TStateInfo | undefined {
  const key = sanitize(idOrName);
  return NigeriaLocations.find((location) => {
    return location.state.id === key || location.state.name.toLowerCase() === key;
  })?.state;
}

/**
 * @function findLGA
 * Internal helper. Matches an LGA within a state by either its UUID or its name.
 *
 * @param {TLGA[]} lgas - Array of LGAs to search within.
 * @param {string} idOrName - A LGA UUID or LGA name.
 * @returns {TLGA | undefined}
 */
function findLGA(lgas: TLGA[], idOrName: string): TLGA | undefined {
  const key = sanitize(idOrName);
  return lgas.find((lga) => {
    return lga.id === key || lga.name.toLowerCase() === key;
  });
}

// ─── All-state queries ────────────────────────────────────────────────────────

/**
 * @function getAllStatesInfo
 * Returns full data for every state.
 *
 * @returns {TStateInfo[]}
 */
export function getAllStatesInfo(): TStateInfo[] {
  return NigeriaLocations.map((location) => ({ ...location.state }));
}

/**
 * @function getAllStates
 * Returns the name and ID of every state.
 *
 * @returns {TState[]}
 */
export function getAllStates(): TState[] {
  return NigeriaLocations.map((location) => ({
    name: location.state.name,
    id: location.state.id,
  }));
}

// ─── Single-state queries ─────────────────────────────────────────────────────

/**
 * @function getStateInfo
 * Returns all data for a single state.
 *
 * @param {string} idOrName - State UUID or name (e.g. "Lagos" or the UUID).
 * @returns {TStateInfo | string} State data, or an error message if not found.
 */
export function getStateInfo(idOrName: string): TStateInfo | string {
  return findState(idOrName) ?? "State not found. Check the ID or name passed.";
}

/**
 * @function getState
 * Returns the name and ID of a single state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {TState | string}
 */
export function getState(idOrName: string): TState | string {
  const state = findState(idOrName);
  if (!state) return "State not found. Check the ID or name passed.";
  return { id: state.id, name: state.name };
}

/**
 * @function getStateCapital
 * Returns the capital city of a state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {string}
 */
export function getStateCapital(idOrName: string): string {
  return findState(idOrName)?.capital ?? "State not found. Check the ID or name passed.";
}

/**
 * @function getStateLandMass
 * Returns the land mass of a state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {string}
 */
export function getStateLandMass(idOrName: string): string {
  return findState(idOrName)?.land_mass ?? "State not found. Check the ID or name passed.";
}

/**
 * @function getStateGeoPoliticalZone
 * Returns the geo-political zone of a state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {string}
 */
export function getStateGeoPoliticalZone(idOrName: string): string {
  return findState(idOrName)?.geopolitical_zone ?? "State not found. Check the ID or name passed.";
}

// ─── LGA queries ──────────────────────────────────────────────────────────────

/**
 * @function getStateLGAs
 * Returns all LGAs in a state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {TLGA[] | string}
 */
export function getStateLGAs(idOrName: string): TLGA[] | string {
  return findState(idOrName)?.lgas ?? "State not found. Check the ID or name passed.";
}

/**
 * @function getLGA
 * Returns a single LGA within a state.
 *
 * @param {string} stateIdOrName - State UUID or name.
 * @param {string} lgaIdOrName - LGA UUID or name.
 * @returns {TLGA | string}
 */
export function getLGA(stateIdOrName: string, lgaIdOrName: string): TLGA | string {
  const state = findState(stateIdOrName);
  if (!state) return "State not found. Check the ID or name passed.";

  return findLGA(state.lgas, lgaIdOrName) ?? "LGA not found. Check the ID or name passed.";
}

// ─── University queries ───────────────────────────────────────────────────────

/**
 * @function getStateUniversities
 * Returns all universities in a state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {TUniversity[] | string}
 */
export function getStateUniversities(idOrName: string): TUniversity[] | string {
  return findState(idOrName)?.universities ?? "State not found. Check the ID or name passed.";
}

// ─── Airport queries ──────────────────────────────────────────────────────────

/**
 * @function getStateAirports
 * Returns all airports in a state.
 *
 * @param {string} idOrName - State UUID or name.
 * @returns {TAirport[] | string}
 */
export function getStateAirports(idOrName: string): TAirport[] | string {
  return findState(idOrName)?.airports ?? "State not found. Check the ID or name passed.";
}
