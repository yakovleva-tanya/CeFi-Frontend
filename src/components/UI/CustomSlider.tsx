import React from "react";
import Form from "react-bootstrap/Form";

type sliderProps = {
  min: string;
  max: string;
  onChange: Function;
  value: number;
};

const CustomSlider = ({ min, max, onChange, value }: sliderProps) => {
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicRangeCustom" className="mb-0 mt-4">
          <Form.Control type="range" custom onChange={(e:any)=>onChange(e)} value={value} />
        </Form.Group>
      </Form>
      <div className="text-xs text-gray d-flex justify-content-between mb-2">
        <div>{min}</div>
        <div>{max}</div>
      </div>
    </div>
  );
};

export default CustomSlider;
