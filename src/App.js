import { Box, Container } from "@mui/system";
import { CssBaseline, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";
import Settings from "./Settings";
import Reports from "./reporting/Reports";

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

        <Box p={5}>
          {selectedTab === 0 ? (
            <Reports />
          ) : selectedTab === 1 ? (
            <Settings />
          ) : (
            <div></div>
          )}
        </Box>
      </Container>
    </Fragment>
  );
}

export default App;
