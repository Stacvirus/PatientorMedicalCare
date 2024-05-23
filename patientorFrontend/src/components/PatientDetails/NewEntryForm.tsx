import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryType } from "../../types";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

const NewEntryForm = ({
  submit,
  diagnosisCodes,
}: {
  submit: (values: object) => void;
  diagnosisCodes: Diagnosis[];
}) => {
  const [baseEntryData, setBaseEntryData] = useState({
    description: "",
    date: "",
    specialist: "",
  });
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [discharge, setDischarge] = useState({ date: "", criteria: "" });
  const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });
  const [employerName, setEmployerName] = useState("");
  const [code, setCode] = useState("J10.1");
  const [codes, setCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState(EntryType.HealthCheckEntry);

  function emptyInputs() {
    setBaseEntryData({
      description: "",
      date: "",
      specialist: "",
    });
    setSickLeave({ startDate: "", endDate: "" });
    setDischarge({ date: "", criteria: "" });
    setEmployerName("");
    setCodes([]);
    setHealthCheckRating("");
  }

  async function handleForm(e: SyntheticEvent) {
    e.preventDefault();
    let newObject: object = {};

    switch (entryType) {
      case "HealthCheck":
        newObject = {
          ...baseEntryData,
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      case "Hospital":
        newObject = {
          ...baseEntryData,
          type: "Hospital",
          discharge: {
            date: discharge.date,
            criteria: discharge.criteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        newObject = {
          ...baseEntryData,
          type: "OccupationalHealthcare",
          employerName: employerName,
          sickLeave: {
            startDate: sickLeave.startDate,
            endDate: sickLeave.endDate,
          },
        };
        break;
      default:
        break;
    }
    if (codes[0] !== "") {
      newObject = {
        ...newObject,
        diagnosisCodes: codes,
      };
    }
    submit(newObject);
  }

  interface EntryTypeOptions {
    value: EntryType;
    label: string;
  }

  const entryTypeOptions: EntryTypeOptions[] = Object.values(EntryType).map(
    (e) => ({
      value: e,
      label: e.toString(),
    })
  );

  function handelTypeChange(e: SelectChangeEvent<string>) {
    e.preventDefault();
    const { value } = e.target;
    if (typeof value === "string") {
      const entryType = Object.values(EntryType).find(
        (e) => e.toString() === value
      );
      entryType && setEntryType(entryType);
    }
  }

  function handleCodesChange(e: SelectChangeEvent<string>) {
    e.preventDefault();
    const { value } = e.target;
    setCode(value);
    setCodes(codes.concat(value));
  }
  console.log(codes);

  return (
    <div>
      <form
        style={{
          marginBottom: "72px",
          border: "dotted 2px",
          padding: "10px 10px 50px 10px",
        }}
        onSubmit={handleForm}
      >
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          label='Entry Type'
          fullWidth
          value={entryType}
          onChange={handelTypeChange}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label='Description'
          fullWidth
          value={baseEntryData.description}
          onChange={({ target }) =>
            setBaseEntryData({ ...baseEntryData, description: target.value })
          }
          style={{ margin: "10px 0" }}
        />
        <TextField
          label='date'
          type='date'
          fullWidth
          value={baseEntryData.date}
          onChange={({ target }) =>
            setBaseEntryData({ ...baseEntryData, date: target.value })
          }
          style={{ margin: "10px 0" }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={baseEntryData.specialist}
          onChange={({ target }) =>
            setBaseEntryData({ ...baseEntryData, specialist: target.value })
          }
          style={{ margin: "10px 0" }}
        />
        {entryType === "HealthCheck" && (
          <TextField
            label='HealthCheck rating'
            type='number'
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
            style={{ margin: "10px 0" }}
          />
        )}
        <InputLabel style={{ marginBottom: 20 }}>Diagnosis codes</InputLabel>
        <Grid>
          <Grid item>
            <Select
              value={code}
              onChange={handleCodesChange}
              style={{ marginRight: 30 }}
            >
              {diagnosisCodes &&
                diagnosisCodes.map((d, key) => (
                  <MenuItem key={key} value={d.code}>
                    {d.code}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item>
            <TextField
              value={codes}
              name='description'
              style={{ margin: "10px 0" }}
            />
          </Grid>
        </Grid>

        {entryType === "Hospital" && (
          <div>
            <InputLabel style={{ marginBottom: 20 }}>Discharge</InputLabel>
            <TextField
              label='date'
              type='date'
              fullWidth
              value={discharge.date}
              onChange={({ target }) =>
                setDischarge({ ...discharge, date: target.value })
              }
              style={{ margin: "10px 0" }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label='Criteria'
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) =>
                setDischarge({ ...discharge, criteria: target.value })
              }
              style={{ margin: "10px 0" }}
            />
          </div>
        )}

        {entryType === "OccupationalHealthcare" && (
          <TextField
            placeholder='Employee'
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            style={{ margin: "10px 0" }}
          />
        )}

        {entryType === "OccupationalHealthcare" && (
          <div>
            <InputLabel style={{ marginBottom: 20 }}>SickLeave</InputLabel>
            <TextField
              label='start'
              type='date'
              fullWidth
              value={sickLeave.startDate}
              onChange={({ target }) =>
                setSickLeave({ ...sickLeave, startDate: target.value })
              }
              style={{ margin: "10px 0" }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label='end'
              type='date'
              fullWidth
              value={sickLeave.endDate}
              onChange={({ target }) =>
                setSickLeave({ ...sickLeave, endDate: target.value })
              }
              style={{ margin: "10px 0" }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        )}

        <Grid>
          <Grid>
            <Button
              color='error'
              variant='contained'
              style={{ float: "left" }}
              type='button'
              // startIcon={<DelectIcon/>}
              onClick={emptyInputs}
            >
              CANCEL
            </Button>
            <Button
              variant='contained'
              style={{ float: "right" }}
              type='submit'
              color='primary'
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewEntryForm;
