import React, { useState, useEffect } from "react";
import { Bar } from "@nivo/bar";
import axios from "axios";

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
  const [messages, setMessages] = useState([]);

  // const addToast = useCallback(async () => {
  //   const res = await axios({
  //     url: "http://localhost:3000/api/report/ranking",
  //   });

  //   console.log(res);

  // const barData = [
  //   { id: "Tokyo", value: 3000000 },
  //   { id: "Osaka", value: 5000000 },
  //   { id: "Nara", value: 7000000 },
  //   { id: "Kyoto", value: 8000000 },
  //   { id: "Kobe", value: 9000000 },
  //   { id: "Sapporo", value: 10000000 },
  // ];

  //   setMessages(barData);
  // }, []);

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

  return (
    <>
      <h2 style={{ marginLeft: 60, fontWeight: 400, color: "#555" }}>
        Arbitrary Value in Japan Cities{" "}
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
        Arbitrary Value in Japan Cities{" "}
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
        Arbitrary Value in Japan Cities{" "}
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
    </>
  );
};

export default Dashboard;
