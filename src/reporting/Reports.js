import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Filters from "./Filters";

const callDirection = [
  { value: 1, name: "Outbound" },
  { value: 2, name: "Inbound" },
  { value: 3, name: "Outbound and Inbound" },
];

const callState = [
  { value: 1, name: "Answered" },
  { value: 2, name: "Missed" },
];

export default function Reports(props) {
  const [selectedCallDirection, setSelectedCallDirection] = useState("");
  const [selectedCallState, setSelectedCallState] = useState("");

  return (
    <Grid container spacing={2}>
      <Filters />
    </Grid>
  );
}
