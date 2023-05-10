import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

interface WorldData {
  cases?: number;
  deaths?: number;
  recovered?: number;
}

interface GraphData {
  cases?: { [key: string]: number };
  deaths?: { [key: string]: number };
  recovered?: { [key: string]: number };
}

const WorldDataAPI = () => {
  const [worldData, setWorldData] = useState<WorldData>({
    cases: 0,
    deaths: 0,
    recovered: 0
  });
  
  const [graphData, setGraphData] = useState<GraphData>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorldData = async () => {
    const response = await axios.get("https://disease.sh/v3/covid-19/all");
    setWorldData(response.data);
  };

  const fetchGraphData = async () => {
    const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=30");
    setGraphData(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchWorldData(), fetchGraphData()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGraph = () => {
    if (!isLoading && graphData && graphData.cases) {
      const data = {
        labels: Object.keys(graphData.cases),
        datasets: [
          {
            label: "Daily Cases",
            data: graphData.cases ? Object.values(graphData.cases) : [],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Daily Deaths",
            data: graphData.deaths ? Object.values(graphData.deaths) : [],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: "Daily Recovered",
            data: graphData.recovered ? Object.values(graphData.recovered): [],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      };
      return (
        <div>
          <h2>Daily Data for the Last 30 Days</h2>
          <Line data={data} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Worldwide Covid-19 Data</h1>
      {!isLoading && (
        <div>
          <div>
            <h2>Worldwide Data of Cases</h2>
            {worldData.cases && <p>Total Cases: {worldData.cases}</p>}
            {worldData.deaths && <p>Total Deaths: {worldData.deaths}</p>}
            {worldData.recovered && <p>Total Recovered: {worldData.recovered}</p>}
          </div>
          {renderGraph()}
        </div>
      )}
    </div>
  );
};

export default WorldDataAPI;
