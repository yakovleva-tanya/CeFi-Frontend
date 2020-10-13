import React, { useContext, useState, useEffect, useMemo } from "react";
import { UniswapContext } from "../../../context/uniswapContext";
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  getRoute,
  ONE_BIPS,
  warningSeverity,
} from "../../../actions/Trades";
import BR from "../../UI/BR";

const UniswapMetrics = () => {
  const { values, trade, isExactIn } = useContext(UniswapContext);
  const [metrics, setMetrics] = useState({
    maximumSold: "-",
    priceImpactWithoutFee: null,
    realizedLPFee: "-",
    path: [],
  });

  useEffect(() => {
    const getTradeMetrics = async () => {
      const maximumSold = await computeSlippageAdjustedAmounts(trade);
      const {
        priceImpactWithoutFee,
        realizedLPFee,
      } = computeTradePriceBreakdown(trade);
      const path = await getRoute(trade);
      setMetrics({
        maximumSold,
        priceImpactWithoutFee,
        realizedLPFee: realizedLPFee.toFixed(2),
        path,
      });
    };
    getTradeMetrics();
  }, [trade]);
  const { maximumSold, priceImpactWithoutFee, realizedLPFee, path } = metrics;
  const severity = useMemo(() => {
    return warningSeverity(priceImpactWithoutFee);
  }, [priceImpactWithoutFee]);

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between">
          <div className="text-lightest-gray">
            {isExactIn ? "Minimum received" : "Maximum sold"}
          </div>
          <div>
            {maximumSold} {values.output.token}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="text-lightest-gray">Price Impact</div>
          <div
            className={
              severity === 3 || severity === 4
                ? "text-red"
                : severity === 2
                ? "text-yellow"
                : severity === 1
                ? ""
                : "text-green"
            }
          >
            {priceImpactWithoutFee
              ? priceImpactWithoutFee.lessThan(ONE_BIPS)
                ? "<0.01%"
                : `${priceImpactWithoutFee.toFixed(2)}%`
              : "-"}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="text-lightest-gray">Liquidity Provider Fee</div>
          <div>
            {realizedLPFee} {values.input.token}
          </div>
        </div>
        <div className="my-5">
          <BR />
        </div>
        <div className=" d-flex justify-content-between">
          <div className="text-lightest-gray">Route</div>
          <div className="font-medium d-flex flex-row text-right">
            {path.map((e: any, i) => {
              return (
                <div key={e} className="d-flex flex-row text-right">
                  <div className="pr-2">{e}</div>
                  <div className="pr-2">{i < path.length - 1 && ">"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapMetrics;
