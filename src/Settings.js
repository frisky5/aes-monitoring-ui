import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";

export default function Settings(props) {
  const [selectedAesServer, setSelectedAesServer] = useState("");
  const [aesServers, setAesServers] = useState([]);
  const [phones, setPhones] = useState([]);
  const [acds, setAcds] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:9090/aesServers",
    }).then(
      (res) => {
        setAesServers(res.data);
        if (res.data.length > 0) setSelectedAesServer(0);
      },
      (err) => {}
    );
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={3} xl={3}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel id="aes-servers-select-label">AES Servers</InputLabel>
              <Select
                labelId="aes-servers-select-label"
                id="aes-servers-select"
                value={selectedAesServer}
                label="AES Servers"
                onChange={(e) => {
                  setSelectedAesServer(e.target.value);
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
          <Grid item xs={1}>
            <IconButton style={{ color: "green" }}>
              <AddCircleIcon></AddCircleIcon>
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton style={{ color: "red" }}>
              <RemoveCircleIcon></RemoveCircleIcon>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
    </Grid>
  );
}
