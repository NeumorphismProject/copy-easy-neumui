import { initOptions } from '@/ecc-lib/chartsLib/common/initOptions'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { useCallback, useEffect, useRef } from 'react'


export default function BarChartEx() {
  const chartRef = useRef(null)

  const createChart = useCallback(() => {
    const chartDom = chartRef.current!
    const myChart = echarts.init(chartDom, undefined, initOptions)
    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    option && myChart.setOption(option as any)
  }, [])

  useEffect(()=>{
    createChart()
  },[])

  return (<div ref={(chartRef)} style={{width: '600px', height: '400px'}}></div>)
}
