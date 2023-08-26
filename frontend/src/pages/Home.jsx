import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Filters from "../components/filters";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getTotalInsights } from "../redux/actions/dashboard";

// ** Charts
import StackedColumnChart from "../components/charts/barCharts/StackedColumnChart";
import StackedBarChartPestleAnalysis from "../components/charts/barCharts/StackedBarChartPestleAnalysis";
import PieChartRegionDistribution from "../components/charts/pieCharts/PieChartRegionDistribution";
import PieChartSectorDistribution from "../components/charts/pieCharts/PieChartSectorDistribution";
import BubbleChart from "../components/charts/bubbleChart/BubbleChart";
import ScatterPlotIntensityRelevance from "../components/charts/scatterCharts/InsightsDistributionMap";
import ColumnChartInsightsByRegion from "../components/charts/barCharts/ColumnChartLikelihoodByRegion";

HighchartsExporting(Highcharts);

const Home = () => {
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const store = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getTotalInsights(filters)).then((res) => {
      if (filters.swot !== "" && filters.swot !== undefined) {
        const fd = applySWOTFilter(res.data, filters.swot);
        console.log(fd);
        return fd;
      }
    });
  }, [filters, dispatch]);

  function applySWOTFilter(data, filterCategory) {
    const filteredData = data.filter((item) => {
      switch (filterCategory) {
        case "strengths":
          return item.impact > 0 && item.relevance >= 3 && item.likelihood >= 3;
        case "weaknesses":
          return item.impact < 0 && item.relevance >= 3 && item.likelihood >= 3;
        case "opportunities":
          return item.impact > 0 && item.relevance >= 3 && item.likelihood < 3;
        case "threats":
          return item.impact < 0 && item.relevance >= 3 && item.likelihood < 3;
        default:
          return false; // Return false for an unknown filter
      }
    });

    return filteredData;
  }

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
          {/* Filters Container */}
          <Container maxWidth="lg" disableGutters sx={{ mt: 4, mb: 4 }}>
            <Filters filters={filters} setFilters={setFilters} insiteData={store.insightData.data} />
          </Container>

          {/* Charts Container */}
          <Container maxWidth="lg" disableGutters sx={{ mt: 4, mb: 4 }}>
            {/* Grid Container */}
            <Grid container spacing={3}>
              {/* StackedColumnChart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "100%", width: "100%" }}>
                    <StackedColumnChart data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              {/* Pie Charts */}

              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "100%", width: "100%" }}>
                    <PieChartRegionDistribution insightsData={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "100%", width: "100%" }}>
                    <PieChartSectorDistribution insightsData={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              {/* StackedBarChartPestleAnalysis */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <StackedBarChartPestleAnalysis data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              {/* BubbleChart */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <BubbleChart data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              {/* ScatterPlotIntensityRelevance */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <ScatterPlotIntensityRelevance data={store.insightData.data} />
                  </div>
                </Paper>
              </Grid>

              {/* ColumnChartInsightsByRegion */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mb: 10 }}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <ColumnChartInsightsByRegion insightsData={store.insightData.data} />
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
