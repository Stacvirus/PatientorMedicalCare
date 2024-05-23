import express from "express";
const diagnosisRouter = express.Router();
import diagnosisService from "../services/diagnosisService";

diagnosisRouter.get("/", (_req, res) => {
  console.log("in diagnoses route");
  res.send(diagnosisService.getNonLatinDiagnosis());
});

export default diagnosisRouter;
