import express from "express";
const patientsRouter = express.Router();
import patientService from "../services/patientsService";
import { toNewPatient, toNewPatientEntry } from "../utils";

patientsRouter.get("/", (_req, res) => {
  console.log("in patients route");
  res.send(patientService.getNonSensitivePatientInfos());
});

patientsRouter.get("/:id", (req, res) => {
  console.log("in id patients route");
  res.send(patientService.findById(req.params.id));
});

patientsRouter.post("/", (req, res) => {
  try {
    const patientEntry = toNewPatient(req.body);
    res.send(patientService.addPatient(patientEntry));
  } catch (error) {
    let errorMsg = "Something went wrong.";
    if (error instanceof Error) {
      errorMsg += "Error" + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const body = toNewPatientEntry(req.body);
    const { id } = req.params;
    res.send(patientService.addPatientEntry(body, id));
  } catch (error) {
    let errorMsg = "Something went wrong.";
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    res.status(400).send(errorMsg);
  }
});

export default patientsRouter;
