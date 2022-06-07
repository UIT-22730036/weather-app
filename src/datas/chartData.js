import { line, curveBasis, area, curveCardinal } from "d3";

export const minX = window.innerWidth / 2;

export const height = (window.innerHeight * 40) / 100;

export const chartData = [
  {
    tide: 0.8,
    hour: "Mon 12:00 pm",
    x: 0,
  },
  {
    tide: 2.1,
    hour: "Mon 6:00 am",
    x: minX,
  },
  {
    tide: 0.7,
    hour: "Mon 12:00 am",
    x: minX * 2,
  },
  {
    tide: 1.9,
    hour: "Mon 6:00 pm",
    x: minX * 3,
  },
  {
    tide: 0.9,
    hour: "Tue 12:00 pm",
    x: minX * 4,
  },
  {
    tide: 2.1,
    hour: "Tue 6:00 am",
    x: minX * 5,
  },
  {
    tide: 0.6,
    hour: "Tue 12:00 am",
    x: minX * 6,
  },
  {
    tide: 2.1,
    hour: "Tue 6:00 pm",
    x: minX * 7,
  },
  {
    tide: 0.8,
    hour: "Wed 12:00 pm",
    x: minX * 8,
  },
  {
    tide: 2.3,
    hour: "Wed 6:00 am",
    x: minX * 9,
  },
  {
    tide: 0.8,
    hour: "Wed 12:00 am",
    x: minX * 10,
  },
  {
    tide: 2.2,
    hour: "Wed 6:00 pm",
    x: minX * 11,
  },
  {
    tide: 0.8,
    hour: "Thur 12:00 pm",
    x: minX * 12,
  },
];

export const nightTime = [
  {
    x: 0,
    h: height,
    w: minX,
  },
  {
    x: minX * 3,
    h: height,
    w: minX * 2,
  },
  {
    x: minX * 7,
    h: height,
    w: minX * 2,
  },
  {
    x: minX * 11,
    h: height,
    w: minX,
  },
];

const yDataMorning = [0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0];

const xDataMorning = [
  minX,
  minX * 2,
  minX * 3,
  minX * 4,
  minX * 5,
  minX * 6,
  minX * 7,
  minX * 8,
  minX * 9,
  minX * 10,
  minX * 11,
];

const xDataTide = [
  0,
  minX,
  minX * 2,
  minX * 3,
  minX * 4,
  minX * 5,
  minX * 6,
  minX * 7,
  minX * 8,
  minX * 9,
  minX * 10,
  minX * 11,
  minX * 12,
];

const morningPoints = xDataMorning.map((x, i) => {
  return {
    x: x,
    y: height - yDataMorning[i] * 150,
  };
});

const morningGen = line()
  .x((p) => p.x)
  .y((p) => p.y)
  .curve(curveCardinal);

export const pathOfMorningLine = morningGen(morningPoints);

const tidePoints = xDataTide.map((x, i) => {
  return {
    x: x,
    y: height - chartData[i].tide * 100,
  };
});

const tideGen = area()
  .x((p) => p.x)
  .y1((p) => p.y)
  .y0(height)
  .curve(curveBasis);

export const pathOfTideLine = tideGen(tidePoints);

export const formatTime = (time) => {
  const fmTime = time % 24;
  const decimal = fmTime % 1;
  const hr = Math.floor(fmTime);
  const min = Math.floor(60 * decimal);
  if (hr > 12) {
    return `${hr - 12}:${min > 10 ? "" : "0"}${min} pm`;
  } else if (hr === 0) {
    return `${12}:${min > 10 ? "" : "0"}${min} pm`;
  }
  return `${hr}:${min > 10 ? "" : "0"}${min} am`;
};

export const convertScrollToTime = (scrollPercentage) => {
  return scrollPercentage * 60 + 6;
};
