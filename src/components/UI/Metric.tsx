import React from "react";

type MetricProps = {
  title: string;
  value?: string;
  values?: Array<string>;
};

const Metric = ({ title, value = "", values}: MetricProps) => {
  return (
    <div className="mb-4">
      <div className="text-gray mb-1">{title}</div>
      {values && values.map((v) =><div key ={v} className="text-lg font-medium">{v}</div>
      )}
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
};

export default Metric;
