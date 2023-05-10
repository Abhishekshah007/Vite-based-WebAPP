import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

interface GraphData {
  cases?: { [key: string]: number };
  deaths?: { [key: string]: number };
  recovered?: { [key: string]: number };
}

const GraphDataAPI = () => {
  const [graphData, setGraphData] = useState<GraphData>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchGraphData = async () => {
    const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all");
    setGraphData(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchGraphData();
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
            label: "Total Cases",
            data: graphData.cases ? Object.values(graphData.cases) : [],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Total Deaths",
            data: graphData.deaths ? Object.values(graphData.deaths) : [],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: "Total Recovered",
            data: graphData.recovered ? Object.values(graphData.recovered): [],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      };
      return <Line data={data} />;
    }
    return null;
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {renderGraph()}
        </div>
      )}
    </div>
  );
};

export default GraphDataAPI;
