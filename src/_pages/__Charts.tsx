import React from "react";
import CountryMapAPI from "./_ChartComponents/___CountryMapAPI";
import GraphDataAPI from "./_ChartComponents/___GraphDataAPI";
import WorldDataAPI from "./_ChartComponents/___WorldDataAPI";

const Charts = () => {
    return (
        <>
            <div>
                <GraphDataAPI />
            </div>
            <div>
                <WorldDataAPI />
            </div>

            <div >
                <CountryMapAPI />
            </div>
        </>
    );
};

export default Charts;
