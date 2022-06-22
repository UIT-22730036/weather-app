import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'

import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import {
  formatTime,
  convertScrollToTime,
  createMorningLinePath,
  createTideLinePath,
} from '../../helper/chartHelperFuncs'

import { chartDataService } from '../../services/chartDataService'

import './Chart.scss'

gsap.registerPlugin(MotionPathPlugin)
const yDataMorning = [0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0]

const Chart = () => {
  const chartSVGRef = useRef(null)
  const motionPathRef = useRef(null)
  const sunRef = useRef(null)
  const moonRef = useRef(null)

  const [moonIsVisible, setMoonIsVisible] = useState(false)
  const [time, setTime] = useState('')
  const [morningPath, setMorningPath] = useState('')
  const [tidePath, setTidePath] = useState('')
  const [nightTime, setNightTime] = useState([])
  const [minWidth, setMinWidth] = useState(window.innerWidth / 2)
  const [height, setHeight] = useState(window.innerHeight * 0.4)
  const [chartData, setChartData] = useState([])
  const [sunPosition, setSunPosition] = useState({ x: minWidth, y: height })
  const [moonPosition, setMoonPosition] = useState({ x: 0, y: 100 })

  useEffect(() => {
    chartSVGRef.current.addEventListener('scroll', positionSunHandler)
    return chartSVGRef.current.removeEventListener('scroll', () => {})
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMinWidth(window.innerWidth / 2)
      setHeight(window.innerHeight * 0.4)
      positionSunHandler()
    })
    return window.removeEventListener('resize', () => {})
  }, [])

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await chartDataService.getChartData()
      setChartData(res.data)
    }
    fetchChartData()
  }, [])

  useEffect(() => {
    const xDataMorning = Array.from(
      { length: 11 },
      (_, i) => minWidth * (i + 1)
    )
    setMorningPath(createMorningLinePath(xDataMorning, yDataMorning, height))
  }, [height, minWidth])

  useEffect(() => {
    const xDataTide = Array.from({ length: 13 }, (_, i) => minWidth * i)
    const yDataTide = chartData.map(yData => yData.tide)
    setTidePath(createTideLinePath(xDataTide, yDataTide, height))
  }, [chartData, minWidth, height])

  useEffect(() => {
    const nightTimeArr = [
      {
        x: 0,
        h: height,
        w: minWidth,
      },
      {
        x: minWidth * 3,
        h: height,
        w: minWidth * 2,
      },
      {
        x: minWidth * 7,
        h: height,
        w: minWidth * 2,
      },
      {
        x: minWidth * 11,
        h: height,
        w: minWidth,
      },
    ]
    setNightTime(nightTimeArr)
  }, [height, minWidth])

  const positionSunHandler = useCallback(() => {
    let chartSVGEl = chartSVGRef.current
    let scrollPercentage =
      chartSVGEl.scrollLeft / (chartSVGEl.scrollWidth - minWidth * 2)
    if (scrollPercentage > 1) scrollPercentage = 1
    setTime(formatTime(convertScrollToTime(scrollPercentage)))
    let rawPath = MotionPathPlugin.getRawPath(motionPathRef.current)
    MotionPathPlugin.cacheRawPathMeasurements(rawPath)
    let point = MotionPathPlugin.getPositionOnPath(rawPath, scrollPercentage)

    setSunPosition({ x: point.x, y: point.y })
    setMoonPosition({ ...moonPosition, x: point.x })

    if (point.y >= 353) {
      setMoonIsVisible(true)
    } else {
      setMoonIsVisible(false)
    }
  }, [minWidth])
  return (
    <div className='chart'>
      <div className='chart__svg' ref={chartSVGRef}>
        <svg height={height} width={12 * minWidth}>
          <g>
            <path fill='#c1e5f7' stroke='none' d={tidePath} />
          </g>
          <g>
            <path
              fill='none'
              stroke='orange'
              ref={motionPathRef}
              d={morningPath}
            />
          </g>
          <g transform={`translate(${moonPosition.x},100)`}>
            <circle
              ref={moonRef}
              fill='#7988A2'
              r={15}
              style={{
                display: `${moonIsVisible ? 'block' : 'none'}`,
              }}
            />
          </g>
          <g transform={`translate(${sunPosition.x},${sunPosition.y})`}>
            <circle
              ref={sunRef}
              fill='#fcdb33'
              r={15}
              style={{
                display: `${moonIsVisible ? 'none' : 'block'}`,
              }}
            />
          </g>
          <g transform='translate(-70,0)'>
            {chartData?.map((point, index) => {
              return point.hour.includes('6:00') ? (
                <Fragment key={point.hour}>
                  <rect
                    width={140}
                    height={80}
                    opacity='0.4'
                    x={minWidth * index}
                    y={50}
                  />
                  <text x={minWidth * index + 20} y={95}>
                    {point.hour}
                  </text>
                </Fragment>
              ) : (
                <Fragment key={point.hour}>
                  <rect
                    width={140}
                    height={80}
                    opacity='0.4'
                    x={minWidth * index}
                    y={130}
                  />
                  <text x={minWidth * index + 20} y={175}>
                    {point.hour}
                  </text>
                </Fragment>
              )
            })}
          </g>
          <g>
            {nightTime.map(rect => {
              return (
                <rect
                  x={rect.x}
                  y={0}
                  width={rect.w}
                  height={rect.h}
                  opacity='0.4'
                  key={rect.x}
                />
              )
            })}
          </g>
        </svg>
      </div>
      <div className='chart__title'>
        <span className='chart__title--tide'>Tide</span>
        <span className='chart__title--sunset'>Sunrise & Sunset</span>
      </div>
      <span className='chart__time'>{time}</span>
    </div>
  )
}

export default Chart
