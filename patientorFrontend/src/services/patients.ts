import axios from "axios";
import { Diagnosis, Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getAPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const getDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
  return data;
};

const postNewPatientEntries = async (object: object, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  create,
  getAPatient,
  getDiagnosis,
  postNewPatientEntries,
};
