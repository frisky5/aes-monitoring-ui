import { Box, Container } from "@mui/system";
import { CssBaseline, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";
import Settings from "./Settings";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Reports" />
          <Tab label="Settings" />
        </Tabs>

        <Box p={5}>{selectedTab === 1 && <Settings></Settings>}</Box>
      </Container>
    </Fragment>
  );
}

export default App;
