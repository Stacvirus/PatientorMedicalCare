import {
  NewPatient,
  Gender,
  Diagnosis,
  healthCheckRating,
  EntryWithoutId,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStrings = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName} ${param}`);
  }
  return param;
};

const isGender = (str: string): str is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(str);
};

const parseGender = (param: unknown): Gender => {
  if (!isString(param) || !isGender(param)) {
    throw new Error("Incorrect of missing gender " + param);
  }
  return param;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatient = {
      name: parseStrings(object.name, "name"),
      dateOfBirth: parseStrings(object.dateOfBirth, "dateOfBirth"),
      gender: parseGender(object.gender),
      occupation: parseStrings(object.occupation, "occupation"),
      ssn: parseStrings(object.ssn, "ssn"),
      entries: [],
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagonsisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isRating = (str: number): str is healthCheckRating => {
  return Object.values(healthCheckRating)
    .map((g) => g.toString())
    .includes(str.toString());
};

const isNumber = (nbr: unknown): nbr is number => {
  return typeof nbr === "number";
};

const parseRating = (param: unknown): healthCheckRating => {
  if (!isNumber(param) || !isRating(param))
    throw new Error("Incorrect or missing health checking rate: " + param);
  return param;
};

const isObject = (obj: unknown): obj is object => {
  return typeof obj === "object";
};

export const toNewPatientEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    const base = {
      description: parseStrings(object.description, "description"),
      date: parseStrings(object.date, "date"),
      specialist: parseStrings(object.specialist, "specialist"),
      diagnosisCodes: parseDiagonsisCodes(object),
    };
    console.log(object.type);

    switch (parseStrings(object.type, "type")) {
      case "HealthCheck":
        if ("healthCheckRating" in object)
          return {
            ...base,
            type: object.type as "HealthCheck",
            healthCheckRating: parseRating(object.healthCheckRating),
          };
        break;
      case "Hospital":
        if (
          "discharge" in object &&
          isObject(object.discharge) &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        )
          return {
            ...base,
            discharge: {
              date: parseStrings(object.discharge.date, "discharge date"),
              criteria: parseStrings(
                object.discharge.criteria,
                "discharge criteria"
              ),
            },
            type: object.type as "Hospital",
          };
        break;
      case "OccupationalHealthcare":
        if (
          "employerName" in object &&
          "sickLeave" in object &&
          isObject(object.sickLeave) &&
          "startDate" in object.sickLeave &&
          "endDate" in object.sickLeave
        )
          return {
            ...base,
            employerName: parseStrings(object.employerName, "employerName"),
            sickLeave: {
              startDate: parseStrings(object.sickLeave.startDate, "startDate"),
              endDate: parseStrings(object.sickLeave.endDate, "endDate"),
            },
            type: object.type as "OccupationalHealthcare",
          };
        break;

      default:
        console.log(object);

        throw new Error("some fields are missing");
    }
  }
  console.log("outside the switch case statements");

  throw new Error("some fields are missing");
};
