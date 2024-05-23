import { Diagnosis, Patient } from "../../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";

import Alert, { AlertColor } from "@mui/material/Alert";
import axios from "axios";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [notify, setNotify] = useState({
    severity: "success" as AlertColor,
    msg: "",
  });
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  const id = useParams().id!;

  useEffect(() => {
    async function fetchPatient() {
      const res = await patientService.getAPatient(id);
      const ress = await patientService.getDiagnosis();
      setPatient(res);
      setDiagnosis(ress);
    }
    void fetchPatient();
  }, []);

  function removeNotification() {
    setTimeout(() => {
      setNotify({ ...notify, msg: "" });
    }, 5000);
  }

  const isObject = (obj: unknown): obj is object => {
    return typeof obj === "object";
  };

  async function submitEntry(object: object) {
    try {
      const res = await patientService.postNewPatientEntries(object, id);
      console.log(res);
      if (isObject(patient) && "entries" in patient) {
        setPatient({ ...patient, entries: patient?.entries.concat(res) });

        setNotify({ msg: "new added successfully!", severity: "success" });
        removeNotification();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const msg = e.response.data.replace("Something went wrong.", "");
          setNotify({ severity: "error", msg });
        } else {
          console.log("unrecognized axios error", e);
          setNotify({ severity: "error", msg: "unrecognized axios error" });
        }
      } else {
        console.log("unknown error", e);
        setNotify({ severity: "error", msg: "unknown error" });
      }
      removeNotification();
    }
  }

  return (
    <>
      <h2>
        {patient?.name}{" "}
        {patient?.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <br />
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <br />

      {notify.msg && <Alert severity={notify.severity}>{notify.msg}</Alert>}

      <NewEntryForm submit={submitEntry} diagnosisCodes={diagnosis!} />

      <h2>entries</h2>

      {patient?.entries.map((p) => (
        <EntryDetails entry={p} diagnosis={diagnosis!} />
      ))}
    </>
  );
};

export default PatientDetails;
