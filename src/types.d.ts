export type TStateInfo = {
  name: string;
  capital: string;
  id: string;
  lgas: TLGA[];
  land_mass: string;
  universities: TUniversity[];
  airports: TAirport[];
  geopolitical_zone: string;
};

export type TState = Pick<TStateInfo, "name" | "id">;

export type TLGA = { name: string; id: string };

export type TUniversity = {
  name: string;
  location: string;
  type: string;
};

export type TAirport = {
  name: string;
  IATA_code: string;
  type: string;
};

export type TLocationInfo = {
  state: TStateInfo;
};

export type TLocation = {
  state: TState;
};
