import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

interface CountryData {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

interface GraphData {
  [key: string]: { [key: string]: number };
}

const CountryMapAPI = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountryData = async () => {
    const response = await axios.get("https://disease.sh/v3/covid-19/countries");
    setCountryData(response.data);
  };

  const fetchGraphData = async () => {
    const response = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
    );
    setGraphData(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCountryData(), fetchGraphData()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderMap = () => {
    if (!isLoading && countryData.length > 0) {
      return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {countryData.map((data) => (
            <div key={data.country} style={{ width: "300px", margin: "16px" }}>
              <h3>{data.country}</h3>
              <p>Total Active Cases: {data.active}</p>
              <p>Total Recovered Cases: {data.recovered}</p>
              <p>Total Deaths: {data.deaths}</p>
              <Line
                data={{
                  labels: Object.keys(graphData),
                  datasets: [
                    {
                      label: "Active Cases",
                      data: Object.values(graphData).map(
                        (val) => val.active || 0
                      ),
                      borderColor: "rgba(255, 99, 132, 1)",
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                    },
                    {
                      label: "Recovered Cases",
                      data: Object.values(graphData).map(
                        (val) => val.recovered || 0
                      ),
                      borderColor: "rgba(54, 162, 235, 1)",
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                    },
                    {
                      label: "Deaths",
                      data: Object.values(graphData).map(
                        (val) => val.deaths || 0
                      ),
                      borderColor: "rgba(75, 192, 192, 1)",
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                    },
                  ],
                }}
              />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>Country Specific Data of Cases</h2>
      {isLoading ? <div>Loading...</div> : renderMap()}
    </div>
  );
};

export default CountryMapAPI;
