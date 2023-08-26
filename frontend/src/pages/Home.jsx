import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Filters from "../components/filters";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";

// ** Store & Actions
import { useDispatch } from "react-redux";
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

const categorizeInsights = (insights) => {
  const categorized = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  };

  insights.forEach((insight) => {
    if (insight.topic === "growth" || insight.topic === "positive_topic") {
      categorized.strengths.push(insight);
    } else if (insight.topic === "risk" || insight.topic === "negative_topic") {
      categorized.weaknesses.push(insight);
    } else if (insight.topic === "opportunity") {
      categorized.opportunities.push(insight);
    } else if (insight.topic === "threat") {
      categorized.threats.push(insight);
    }
  });

  return categorized;
};

const Home = () => {
  const [insightData, setInsightData] = useState([]);
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalInsights(filters)).then((res) => {
      const newData = filters.swot ? applySWOTFilter(res.data, filters.swot) : res.data;
      setInsightData(newData);
    });
  }, [filters, dispatch]);

  const applySWOTFilter = (data, filterCategory) => {
    const categorizedData = categorizeInsights(data);

    switch (filterCategory) {
      case "strengths":
        return categorizedData.strengths;
      case "weaknesses":
        return categorizedData.weaknesses;
      case "opportunities":
        return categorizedData.opportunities;
      case "threats":
        return categorizedData.threats;
      default:
        return [];
    }
  };

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
      {/* <Toolbar /> */}

      {/* Filters Container */}
      <Container maxWidth="lg" disableGutters sx={{ mt: 4, mb: 4 }}>
        <Filters filters={filters} setFilters={setFilters} insiteData={insightData} />
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
                <StackedColumnChart data={insightData} />
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
                <PieChartRegionDistribution insightsData={insightData} />
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
                <PieChartSectorDistribution insightsData={insightData} />
              </div>
            </Paper>
          </Grid>

          {/* StackedBarChartPestleAnalysis */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div style={{ height: "100%", width: "100%" }}>
                <StackedBarChartPestleAnalysis data={insightData} />
              </div>
            </Paper>
          </Grid>

          {/* BubbleChart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div style={{ height: "100%", width: "100%" }}>
                <BubbleChart data={insightData} />
              </div>
            </Paper>
          </Grid>

          {/* ScatterPlotIntensityRelevance */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div style={{ height: "100%", width: "100%" }}>
                <ScatterPlotIntensityRelevance data={insightData} />
              </div>
            </Paper>
          </Grid>

          {/* ColumnChartInsightsByRegion */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div style={{ height: "100%", width: "100%" }}>
                <ColumnChartInsightsByRegion insightsData={insightData} />
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* footer */}
        <Typography variant="body2" color="text.primary" align="center" sx={{ p: 7, fontWeight: "bold", fontSize: "large" }}>
          {"Made With ❤️ by "}
          <Link color="inherit" href="https://www.linkedin.com/in/imkrrish/" target="_blank">
            Krishan Kumar
          </Link>{" "}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
