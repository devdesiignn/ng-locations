import { describe, it, expect } from "vitest";
import {
  getAllStatesInfo,
  getAllStates,
  getStateInfo,
  getState,
  getStateCapital,
  getStateLandMass,
  getStateGeoPoliticalZone,
  getStateLGAs,
  getLGA,
  getStateUniversities,
  getStateAirports,
} from "@/functions";

// Known fixture data from the dataset
const ABIA_ID = "2e14a7ed-349a-44f6-9e12-abfec3e5f6ed";
const ABIA_NAME = "Abia";
const ABA_SOUTH_ID = "4c840cb1-8f58-40d3-9aff-5a3b77fdba71";

describe("getAllStatesInfo", () => {
  it("returns an array", () => {
    expect(Array.isArray(getAllStatesInfo())).toBe(true);
  });

  it("returns 36 states + FCT (37 total)", () => {
    expect(getAllStatesInfo().length).toBe(37);
  });

  it("each state has the expected shape", () => {
    const first = getAllStatesInfo()[0];
    expect(first).toHaveProperty("name");
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("capital");
    expect(first).toHaveProperty("lgas");
    expect(first).toHaveProperty("land_mass");
    expect(first).toHaveProperty("universities");
    expect(first).toHaveProperty("airports");
    expect(first).toHaveProperty("geopolitical_zone");
  });
});

describe("getAllStates", () => {
  it("returns only name and id per state", () => {
    const states = getAllStates();
    const first = states[0];
    expect(Object.keys(first)).toEqual(["name", "id"]);
  });
});

describe("getStateInfo", () => {
  it("finds a state by ID", () => {
    const result = getStateInfo(ABIA_ID);
    expect(typeof result).toBe("object");
    expect((result as any).name).toBe("Abia");
  });

  it("finds a state by exact name", () => {
    const result = getStateInfo("Abia");
    expect(typeof result).toBe("object");
    expect((result as any).id).toBe(ABIA_ID);
  });

  it("finds a state by lowercase name", () => {
    const result = getStateInfo("abia");
    expect(typeof result).toBe("object");
    expect((result as any).name).toBe("Abia");
  });

  it("finds a state by name with extra whitespace", () => {
    const result = getStateInfo("  Lagos  ");
    expect(typeof result).toBe("object");
    expect((result as any).name).toBe("Lagos");
  });

  it("finds a state by UPPERCASE name", () => {
    const result = getStateInfo("LAGOS");
    expect(typeof result).toBe("object");
    expect((result as any).name).toBe("Lagos");
  });

  it("returns an error string for unknown input", () => {
    const result = getStateInfo("not-a-real-state");
    expect(typeof result).toBe("string");
  });
});

describe("getState", () => {
  it("returns only name and id", () => {
    const result = getState(ABIA_NAME);
    expect(typeof result).toBe("object");
    expect(Object.keys(result)).toEqual(["id", "name"]);
  });

  it("returns error string if not found", () => {
    expect(typeof getState("nowhere")).toBe("string");
  });
});

describe("getStateCapital", () => {
  it("returns capital by state name", () => {
    expect(getStateCapital("Abia")).toBe("Umuahia");
  });

  it("returns capital by state ID", () => {
    expect(getStateCapital(ABIA_ID)).toBe("Umuahia");
  });

  it("is case-insensitive", () => {
    expect(getStateCapital("lagos")).toBe("Ikeja");
  });

  it("returns error string if not found", () => {
    expect(typeof getStateCapital("fake")).toBe("string");
  });
});

describe("getStateLandMass", () => {
  it("returns land mass by name", () => {
    expect(getStateLandMass("Abia")).toBe("6,320 km²");
  });

  it("returns error string if not found", () => {
    expect(typeof getStateLandMass("nowhere")).toBe("string");
  });
});

describe("getStateGeoPoliticalZone", () => {
  it("returns geo-political zone by name", () => {
    expect(getStateGeoPoliticalZone("Abia")).toBe("South East");
  });

  it("returns geo-political zone by ID", () => {
    expect(getStateGeoPoliticalZone(ABIA_ID)).toBe("South East");
  });
});

describe("getStateLGAs", () => {
  it("returns an array of LGAs", () => {
    const lgas = getStateLGAs("Abia");
    expect(Array.isArray(lgas)).toBe(true);
  });

  it("each LGA has name and id", () => {
    const lgas = getStateLGAs("Abia") as any[];
    expect(lgas[0]).toHaveProperty("name");
    expect(lgas[0]).toHaveProperty("id");
  });

  it("returns error string if state not found", () => {
    expect(typeof getStateLGAs("nowhere")).toBe("string");
  });
});

describe("getLGA", () => {
  it("finds an LGA by ID", () => {
    const result = getLGA(ABIA_ID, ABA_SOUTH_ID);
    expect(typeof result).toBe("object");
    expect((result as any).name).toBe("Aba South");
  });

  it("finds an LGA by name", () => {
    const result = getLGA("Abia", "Aba South");
    expect(typeof result).toBe("object");
    expect((result as any).id).toBe(ABA_SOUTH_ID);
  });

  it("finds an LGA by lowercase name", () => {
    const result = getLGA("abia", "aba south");
    expect(typeof result).toBe("object");
    expect((result as any).name).toBe("Aba South");
  });

  it("returns error string if state not found", () => {
    expect(typeof getLGA("nowhere", "something")).toBe("string");
  });

  it("returns error string if LGA not found within valid state", () => {
    expect(typeof getLGA("Abia", "Fake LGA")).toBe("string");
  });
});

describe("getStateUniversities", () => {
  it("returns an array of universities", () => {
    const unis = getStateUniversities("Abia");
    expect(Array.isArray(unis)).toBe(true);
  });

  it("each university has name, location, type", () => {
    const unis = getStateUniversities("Abia") as any[];
    expect(unis[0]).toHaveProperty("name");
    expect(unis[0]).toHaveProperty("location");
    expect(unis[0]).toHaveProperty("type");
  });

  it("returns error string if state not found", () => {
    expect(typeof getStateUniversities("nowhere")).toBe("string");
  });
});

describe("getStateAirports", () => {
  it("returns an array", () => {
    const airports = getStateAirports("Lagos");
    expect(Array.isArray(airports)).toBe(true);
  });

  it("returns error string if state not found", () => {
    expect(typeof getStateAirports("nowhere")).toBe("string");
  });
});
