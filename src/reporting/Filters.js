import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  Checkbox,
  ListItemText,
  Fade,
  AccordionActions,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";

const callDirection = [
  { value: 1, name: "Outbound" },
  { value: 2, name: "Inbound" },
  { value: 3, name: "Outbound & Inbound" },
];

const callState = [
  { value: 1, name: "Answered" },
  { value: 2, name: "Missed" },
  { value: 3, name: "Answered & Missed" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Filters(props) {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const [selectedCallDirection, setSelectedCallDirection] = useState("");
  const [selectedCallState, setSelectedCallState] = useState("");

  const [aesServers, setAesServers] = useState([]);
  const [selectedAesServer, setSelectedAesServer] = useState("");

  const [phones, setPhones] = useState([]);
  const [selectedPhones, setSelectedPhones] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:9090/aesServers",
    }).then(
      (res) => {
        setAesServers(res.data);
      },
      (err) => {}
    );
  }, []);

  async function getPhonesByAesId(aesId) {
    axios({
      method: "get",
      url: "http://localhost:9090/phones/aes/" + aesId,
    }).then(
      (res) => {
        setPhones(res.data);
        setLoading(false);
        setFadeIn(true);
      },
      (err) => {}
    );
  }

  return (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormControl fullWidth>
                    <InputLabel id="call-direction-select-label">
                      Call Direction
                    </InputLabel>
                    <Select
                      labelId="call-direction-select-label"
                      id="call-direction-select"
                      value={selectedCallDirection}
                      label="Call Direction"
                      onChange={(e) => {
                        setSelectedCallDirection(e.target.value);
                      }}
                    >
                      {callDirection.map((direction, index) => (
                        <MenuItem key={index} value={direction.value}>
                          {direction.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormControl fullWidth>
                    <InputLabel id="call-state-select-label">
                      Call State
                    </InputLabel>
                    <Select
                      labelId="call-state-select-label"
                      id="call-state-select"
                      value={selectedCallState}
                      label="Call State"
                      onChange={(e) => {
                        setSelectedCallState(e.target.value);
                      }}
                    >
                      {callState.map((state, index) => (
                        <MenuItem key={index} value={state.value}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="aes-servers-select-label">
                      AES Servers
                    </InputLabel>
                    <Select
                      labelId="aes-servers-select-label"
                      id="aes-servers-select"
                      value={selectedAesServer}
                      label="AES Servers"
                      onChange={(e) => {
                        setSelectedAesServer(e.target.value);
                        getPhonesByAesId(e.target.value);
                      }}
                    >
                      {aesServers.map((aesServer, index) => (
                        <MenuItem key={index} value={index}>
                          {aesServer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Fade in={fadeIn}>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <InputLabel id="phones-select-label">Stations</InputLabel>
                      <Select
                        labelId="phones-select-label"
                        id="phones-select"
                        multiple
                        value={selectedPhones}
                        onChange={(event) => {
                          const {
                            target: { value },
                          } = event;
                          setSelectedPhones(
                            typeof value === "string" ? value.split(",") : value
                          );
                        }}
                        label="Stations"
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {phones.map((phone) => (
                          <MenuItem key={phone.id} value={phone.name}>
                            <Checkbox
                              checked={selectedPhones.indexOf(phone.name) > -1}
                            />
                            <ListItemText primary={phone.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Fade>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained">Fetch</Button>
        </AccordionActions>
      </Accordion>
    </Grid>
  );
}
