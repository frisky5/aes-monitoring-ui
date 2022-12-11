import {
  Fade,
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
import { useEffect, useMemo, useRef, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

export default function Settings(props) {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const [aesServers, setAesServers] = useState([]);
  const [selectedAesServer, setSelectedAesServer] = useState("");
  const [phones, setPhones] = useState([]);
  const [phonesCols, setPhonesCols] = useState([
    {
      field: "id",
      headerName: "Internal DB ID",
      checkboxSelection: true,
    },
    {
      field: "type",
      headerName: "Type",
    },
    { field: "name", headerName: "Station Number" },
  ]);

  const [acds, setAcds] = useState([]);
  const [acdCols, setAcdCols] = useState([
    {
      field: "id",
      headerName: "Internal DB ID",
      checkboxSelection: true,
    },
    {
      field: "type",
      headerName: "Type",
    },
    { field: "name", headerName: "ACD Number" },
  ]);

  const phonesGridRef = useRef();
  const acdGridridRef = useRef();

  const defaultColDef = useMemo(() => ({
    sortable: true,
    selectable: true,
    suppressCellSelection: true,
    filter: true,
  }));

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
        phonesGridRef.current.api.sizeColumnsToFit();
        setLoading(false);
        setFadeIn(true);
      },
      (err) => {}
    );
  }

  async function getACDsByAesId(aesId) {
    axios({
      method: "get",
      url: "http://localhost:9090/acds/aes/" + aesId,
    }).then(
      (res) => {
        setAcds(res.data);
        acdGridridRef.current.api.sizeColumnsToFit();
        setLoading(false);
      },
      (err) => {}
    );
  }

  return (
    <Grid container spacing={5}>
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
                  setLoading(true);
                  setSelectedAesServer(e.target.value);
                  getPhonesByAesId(e.target.value);
                  getACDsByAesId(e.target.value);
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
            <IconButton disabled={selectedAesServer === ""}>
              <RemoveCircleIcon
                style={{ color: selectedAesServer === "" ? "grey" : "red" }}
              ></RemoveCircleIcon>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={9} xl={9}></Grid>

      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Fade in={fadeIn}>
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 500 }}
          >
            <AgGridReact
              ref={phonesGridRef}
              rowData={phones}
              columnDefs={phonesCols}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection="multiple"
              onGridReady={() => {
                phonesGridRef.current.api.sizeColumnsToFit();
              }}
            />
          </div>
        </Fade>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Fade in={fadeIn}>
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 500 }}
          >
            <AgGridReact
              ref={acdGridridRef}
              rowData={acds}
              columnDefs={acdCols}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection="multiple"
              onGridReady={() => {
                acdGridridRef.current.api.sizeColumnsToFit();
              }}
            />
          </div>
        </Fade>
      </Grid>
    </Grid>
  );
}
