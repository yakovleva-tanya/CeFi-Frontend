import React from "react";

type MetricProps = {
  title: string;
  value?: string;
};

const Metric = ({ title, value = "" }: MetricProps) => {
  return (
    <div className="m-3">
      <div className="text-gray mb-1">{title}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
};

export default Metric;
