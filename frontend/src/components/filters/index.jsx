import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

const Filters = ({ filters, setFilters, insiteData }) => {
  const handleChange = (filterName) => (event, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const generateOptions = (property) => {
    const uniqueValues = [...new Set(insiteData.map((item) => item[property]))];
    return uniqueValues;
  };

  const filterOptions = ["start_year", "end_year", "topic", "sector", "region", "pestle", "source", "country", "swot"];

  const swotOptions = ["strengths", "weaknesses", "opportunities", "threats"];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{fontSize: "large", fontWeight: "semibold"}}>Filters</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {filterOptions.map((filter) => (
            <Grid key={filter} item xs={6} md={3}>
              {filter === "swot" ? (
                <Autocomplete
                  sx={{ width: "100%" }}
                  id={`${filter}-autocomplete`}
                  options={swotOptions}
                  value={filters[filter]}
                  onChange={handleChange(filter)}
                  renderInput={(params) => <TextField {...params} label={filter} />}
                />
              ) : (
                <Autocomplete
                  sx={{ width: "100%" }}
                  id={`${filter}-autocomplete`}
                  options={generateOptions(filter).filter((item) => item !== ("" || null))}
                  value={filters[filter]}
                  onChange={handleChange(filter)}
                  renderInput={(params) => <TextField {...params} label={filter} />}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filters;
