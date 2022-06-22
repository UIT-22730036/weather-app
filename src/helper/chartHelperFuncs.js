import { area, curveBasis, curveCardinal, line } from 'd3'

export const createMorningLinePath = (xData, yData, height) => {
  const morningGen = line()
    .x(p => p.x)
    .y(p => p.y)
    .curve(curveCardinal)

  const morningPoints = xData.map((x, i) => {
    return {
      x: x,
      y: height - yData[i] * 150,
    }
  })
  const morningPath = morningGen(morningPoints)
  return morningPath
}

export const createTideLinePath = (xData, yData, height) => {
  const tideGen = area()
    .x(p => p.x)
    .y1(p => p.y)
    .y0(height)
    .curve(curveBasis)
  const tidePoints = xData.map((x, i) => {
    return {
      x: x,
      y: height - yData[i] * 100,
    }
  })
  const tidePath = tideGen(tidePoints)
  return tidePath
}

export const convertScrollToTime = scrollPercentage => {
  return scrollPercentage * 60 + 6
}

export const formatTime = time => {
  const fmTime = time % 24
  const decimal = fmTime % 1
  const hr = Math.floor(fmTime)
  const min = Math.floor(decimal * 60)
  if (hr > 12) {
    return `${hr - 12}:${min > 9 ? `${min}` : `0${min}`} pm`
  } else if (hr === 0) {
    return `${0}:${min > 9 ? `${min}` : `0${min}`} am`
  }
  return `${hr}:${min > 9 ? `${min}` : `0${min}`} am`
}
