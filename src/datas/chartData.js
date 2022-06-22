export const yDataMorning = [0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0]

export const formatTime = time => {
  const fmTime = time % 24
  const decimal = fmTime % 1
  const hr = Math.floor(fmTime)
  const min = Math.floor(60 * decimal)
  if (hr > 12) {
    return `${hr - 12}:${min > 10 ? '' : '0'}${min} pm`
  } else if (hr === 0) {
    return `${12}:${min > 10 ? '' : '0'}${min} pm`
  }
  return `${hr}:${min > 10 ? '' : '0'}${min} am`
}

export const convertScrollToTime = scrollPercentage => {
  // scrollPercentage * full time range + 6
  return scrollPercentage * 60 + 6
}
