import React, { useState, useEffect, useRef } from "react";
import { Bar } from "@nivo/bar";
import axios from "axios";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import Chart from "react-google-charts";
import "./Dashboard.css";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Marker = ({ children }) => children;

const BarComponent = (props) => {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={props.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={props.width} height={props.height} fill={props.color} />
      <rect
        x={props.width - 5}
        width={5}
        height={props.height}
        fill={props.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={props.width - 16}
        y={props.height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 900,
          fontSize: 15,
        }}
      >
        {props.data.indexValue}
      </text>
      <text
        x={props.width - 16}
        y={props.height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill={props.borderColor}
        style={{
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        {props.data.value}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);

  const url = "http://localhost:3333/api/accident?all=true";
  const { data, error } = useSwr(url, { fetcher });
  console.log(data);
  const crimes = data && !error ? data : [];
  const points = crimes.map((crime) => ({
    type: "Feature",
    properties: { cluster: false, crimeId: crime.id, category: crime.region },
    geometry: {
      type: "Point",
      coordinates: [
        crime.location.coordinates[0],
        crime.location.coordinates[1],
      ],
    },
  }));
  console.log({ points });

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 220, maxZoom: 25 },
  });

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:3333/api/report/ranking",
    }).then((res) => {
      console.log(res.data);
      const regions = res.data.regions.map((m) => {
        return { id: m.region, value: m.count };
      });
      const shifts = res.data.shifts.map((m) => {
        return { id: m.shift, value: m.count };
      });
      const types = res.data.types.map((m) => {
        return { id: m.type, value: m.count };
      });

      setMessages({ regions, shifts, types });
    });
  }, []);

  const [dates, setDates] = useState([]);

  return (
    <div id="dashboard-wrapper">
      <Chart
        width={1000}
        height={200}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "date", id: "Date" },
            { type: "number", id: "Won/Loss" },
          ],
          [new Date(2018, 11, 1), 333],
          [new Date(2018, 11, 2), 221],
          [new Date(2018, 11, 3), 321],
          [new Date(2018, 11, 4), 323],
          [new Date(2018, 11, 5), 434],
          [new Date(2018, 11, 6), 345],
          [new Date(2018, 11, 7), 377],
          [new Date(2018, 11, 8), 488],
          [new Date(2018, 11, 9), 421],
          [new Date(2018, 11, 10), 489],
          [new Date(2018, 11, 11), 378],
          [new Date(2018, 11, 12), 367],
          [new Date(2018, 11, 13), 412],
          [new Date(2018, 11, 14), 361],
          [new Date(2018, 11, 15), 405],
          [new Date(2018, 11, 16), 355],
          [new Date(2018, 11, 17), 478],
          [new Date(2018, 11, 18), 345],
          [new Date(2018, 11, 19), 397],
          [new Date(2018, 11, 20), 361],
          [new Date(2018, 11, 21), 356],
          [new Date(2018, 11, 22), 418],
          [new Date(2018, 11, 23), 361],
          [new Date(2018, 11, 24), 374],
          [new Date(2018, 11, 25), 325],
          [new Date(2018, 11, 26), 416],
          [new Date(2018, 11, 27), 322],
          [new Date(2018, 11, 28), 358],
          [new Date(2018, 11, 29), 333],
          [new Date(2018, 11, 30), 201],
          [new Date(2018, 11, 31), 321],
        ]}
        options={{
          title: "Quantidade de acidentes por dia",
        }}
        rootProps={{ "data-testid": "2" }}
      />
      <h2 style={{ marginLeft: 60, fontWeight: 400, color: "#555" }}>
        Ranking dos Horários do Dia com Maior Quantidade Acidentes
      </h2>
      <Bar
        width={800}
        height={500}
        layout="horizontal"
        margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
        data={messages && messages.shifts ? messages.shifts : []}
        indexBy="id"
        keys={["value"]}
        colors={{ scheme: "spectral" }}
        colorBy="indexValue"
        borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
        enableGridX
        enableGridY={false}
        axisTop={{
          format: "~s",
        }}
        axisBottom={{
          format: "~s",
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />

      <h2 style={{ marginLeft: 60, fontWeight: 400, color: "#555" }}>
        Ranking dos Tipos de Acidente
      </h2>
      <Bar
        width={800}
        height={500}
        layout="horizontal"
        margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
        data={messages && messages.types ? messages.types : []}
        indexBy="id"
        keys={["value"]}
        colors={{ scheme: "spectral" }}
        colorBy="indexValue"
        borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
        enableGridX
        enableGridY={false}
        axisTop={{
          format: "~s",
        }}
        axisBottom={{
          format: "~s",
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />
      <h2 style={{ marginLeft: 60, fontWeight: 400, color: "#555" }}>
        Ranking de Regiões com Maiores Acidentes
      </h2>
      <Bar
        width={800}
        height={500}
        layout="horizontal"
        margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
        data={messages && messages.regions ? messages.regions : []}
        indexBy="id"
        keys={["value"]}
        colors={{ scheme: "spectral" }}
        colorBy="indexValue"
        borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
        enableGridX
        enableGridY={false}
        axisTop={{
          format: "~s",
        }}
        axisBottom={{
          format: "~s",
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />

      <h2 style={{ marginLeft: 60, fontWeight: 400, color: "#555" }}>
        Locais onde ocorreram os acidentes (Mapa por Agrupamento)
      </h2>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={{ lat: -15.3089138536273, lng: -54.2681574192833 }}
          defaultZoom={4}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount,
            } = cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }

            return (
              <Marker
                key={`crime-${cluster.properties.crimeId}`}
                lat={latitude}
                lng={longitude}
              >
                <button className="crime-marker">
                  <img src="/logo512.png" alt="Accident" />
                </button>
              </Marker>
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Dashboard;
