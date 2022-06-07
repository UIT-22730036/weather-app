import React, { Fragment, useEffect, useState } from "react";

import {
  minX,
  pathOfMorningLine,
  pathOfTideLine,
  chartData,
  nightTime,
  height,
  formatTime,
  convertScrollToTime,
} from "../../datas/chartData";

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Chart.scss";

const Chart = () => {
  const [moonIsVisible, setMoonIsVisible] = useState(false);
  const [time, setTime] = useState("");
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
  useEffect(() => {
    positionSunHandler();
    document.querySelector(".chart__svg").addEventListener("scroll", (e) => {
      positionSunHandler();
    });
    return document
      .querySelector(".chart__svg")
      .removeEventListener("scroll", () => {});
  }, []);
  const positionSunHandler = () => {
    let chartSVGEl = document.querySelector(".chart__svg");
    let scrollPercentage =
      chartSVGEl.scrollLeft / (chartSVGEl.scrollWidth - minX * 2);
    if (scrollPercentage > 1) {
      scrollPercentage = 1;
    }
    setTime(formatTime(convertScrollToTime(scrollPercentage)));
    let rawPath = MotionPathPlugin.getRawPath("#motionPath"),
      point;
    MotionPathPlugin.cacheRawPathMeasurements(rawPath);
    point = MotionPathPlugin.getPositionOnPath(rawPath, scrollPercentage);
    let sun = document.getElementById("sun");
    let moon = document.getElementById("moon");
    if (point.x > 0) {
      sun.setAttribute("transform", `translate(${point.x},${point.y})`);
    } else {
      gsap.to("#sun", { x: minX, y: height });
    }
    if (point.y >= 353) {
      setMoonIsVisible(true);
    } else {
      setMoonIsVisible(false);
    }
    moon.setAttribute("transform", `translate(${point.x},100)`);
  };
  return (
    <div className="chart">
      <div className="chart__svg">
        <svg height={height} width={12 * minX}>
          <g>
            <path fill="#c1e5f7" stroke="none" d={pathOfTideLine} />
          </g>
          <g>
            <path
              fill="none"
              stroke="orange"
              id="motionPath"
              d={pathOfMorningLine}
            />
          </g>
          <g>
            <circle
              id="moon"
              fill="#7988A2"
              r={15}
              style={{
                display: `${moonIsVisible ? "block" : "none"}`,
              }}
            />
          </g>
          <g>
            <circle
              id="sun"
              fill="#fcdb33"
              r={15}
              style={{
                display: `${moonIsVisible ? "none" : "block"}`,
              }}
            />
          </g>
          <g transform="translate(-70,0)">
            {chartData.map((point) => {
              return point.hour.includes("6:00") ? (
                <Fragment key={point.hour}>
                  <rect
                    width={140}
                    height={80}
                    opacity="0.4"
                    x={point.x}
                    y={50}
                  />
                  <text x={point.x + 20} y={95}>
                    {point.hour}
                  </text>
                </Fragment>
              ) : (
                <Fragment key={point.hour}>
                  <rect
                    width={140}
                    height={80}
                    opacity="0.4"
                    x={point.x}
                    y={130}
                  />
                  <text x={point.x + 20} y={175}>
                    {point.hour}
                  </text>
                </Fragment>
              );
            })}
          </g>
          <g>
            {nightTime.map((rect) => {
              return (
                <rect
                  x={rect.x}
                  y={0}
                  width={rect.w}
                  height={rect.h}
                  opacity="0.4"
                  key={rect.x}
                />
              );
            })}
          </g>
        </svg>
      </div>
      <div className="chart__title">
        <span className="chart__title--tide">Tide</span>
        <span className="chart__title--sunset">Sunrise & Sunset</span>
      </div>
      <span className="chart__time">{time}</span>
    </div>
  );
};

export default Chart;
