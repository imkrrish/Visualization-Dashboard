import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Filters from "../components/filters";
import IntensityByTopicBarChart from "../components/charts/BarChart";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getTotalInsights } from "../redux/actions/dashboard";
import StackedColumnChart from "./../components/charts/StackedColumnChart";
import TopCountriesByInsightCountBarChart from "./../components/charts/CountriesBarChart";

const Home = () => {
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const store = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getTotalInsights(filters));
  }, [filters, dispatch]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#F5F5F5",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />

      {store.insightData.data?.length > 0 && (
        <>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Filters filters={filters} setFilters={setFilters} insiteData={store.insightData.data} />
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* HightChart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    // height: 600,
                  }}
                >
                  <div style={{ height: "100%", width: "100%" }}>
                    {/* <IntensityByTopicBarChart data={insightData} /> */}
                    <StackedColumnChart data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  hello
                  {/* <div style={{ height: "100%", width: "100%" }}>
                <PieChartWithLegend data={data} />
              </div> */}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <IntensityByTopicBarChart data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    mb: 10
                    // height: 600,
                  }}
                >
                  <div style={{ height: "100%", width: "100%" }}>
                    {/* <IntensityByTopicBarChart data={insightData} /> */}
                    <TopCountriesByInsightCountBarChart data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};

export default Home;
