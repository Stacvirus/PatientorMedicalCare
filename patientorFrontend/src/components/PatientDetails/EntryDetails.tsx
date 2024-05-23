import { Entry, Diagnosis } from "../../types";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function EntryDetails({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnosis[];
}) {
  const chooseIcon = (rate: number) => {
    const ans =
      rate === 0 ? (
        <FavoriteIcon color='success' />
      ) : rate === 1 ? (
        <FavoriteIcon sx={{ color: "#fc0" }} />
      ) : rate === 2 ? (
        <FavoriteIcon color='warning' />
      ) : (
        <FavoriteIcon color='error' />
      );

    return ans;
  };

  let element;
  switch (entry.type) {
    case "HealthCheck":
      element = (
        <div>
          <p>
            {entry.date} {<MedicalServicesIcon />}
          </p>
          <p>
            <i>{entry.description}</i>
          </p>
          {chooseIcon(entry.healthCheckRating)}
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
      break;
    case "Hospital":
      element = (
        <div>
          <p>
            {entry.date} {entry.description} {<AddBoxIcon />}
          </p>
          <p>diagnose by {entry.specialist}</p>
          <p>
            {entry.discharge.date} {entry.discharge.criteria}
          </p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((d, key) => (
                <li key={key}>
                  {d} {diagnosis.map((di) => (di.code === d ? di.name : null))}
                </li>
              ))}
          </ul>
        </div>
      );
      break;
    case "OccupationalHealthcare":
      element = (
        <div>
          <p>
            {entry.date} {entry.description} {<WorkIcon />} {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
      break;

    default:
      break;
  }
  return (
    <div
      key={entry.id}
      style={{
        border: "1px solid",
        borderRadius: "5px",
        marginBottom: "5px",
        padding: "5px",
      }}
    >
      {element}
    </div>
  );
}
