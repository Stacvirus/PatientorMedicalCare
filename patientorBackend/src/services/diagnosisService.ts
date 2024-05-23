import { Diagnosis, NonLatinDiagnosis } from "../types";
import diagnosesData from "../../diagnoses.json";

const diagnosesEntry: Diagnosis[] = diagnosesData as Diagnosis[];

const getDiagnosis = (): Diagnosis[] => {
  return diagnosesEntry;
};

const getNonLatinDiagnosis = (): NonLatinDiagnosis[] => {
  return diagnosesEntry.map(({ name, code }) => ({
    name,
    code,
  }));
};

export default {
  getDiagnosis,
  getNonLatinDiagnosis,
};
