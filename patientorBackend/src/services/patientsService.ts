import {
  Patient,
  NonSensitivePatientInfo,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";
import patientsData from "../../patients";
import { v1 as uuid } from "uuid";

const patientEntry: Patient[] = patientsData as Patient[];

const getNonSensitivePatientInfos = (): NonSensitivePatientInfo[] => {
  return patientEntry.map(({ name, id, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const getPatient = patientEntry.find((p) => p.id === id);
  return getPatient;
};

const addPatient = (object: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...object,
  };
  patientEntry.push(newPatient);
  return newPatient;
};

const addPatientEntry = (
  object: EntryWithoutId,
  id: string
): Entry | undefined => {
  const getPatient = findById(id);
  const newObject = { ...object, id: uuid() };
  getPatient!.entries = getPatient!.entries.concat(newObject);
  return newObject;
};

export default {
  getNonSensitivePatientInfos,
  findById,
  addPatient,
  addPatientEntry,
};
