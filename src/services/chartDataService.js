import axios from 'axios'

const BASE_URL = 'https://6201d07eb8735d00174cb5bc.mockapi.io'

export const chartDataService = {
  getChartData: async () => {
    const res = await axios.get(`${BASE_URL}/chartData`)
    return res
  },
}
