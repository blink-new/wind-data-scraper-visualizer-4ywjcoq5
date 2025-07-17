import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface WindData {
  id: string
  timestamp: number
  date: string
  time: string
  minSpeed: number
  avgSpeed: number
  gusts: number
  direction: string
  degrees: number
  temperature: number
  userId: string
}

interface WindSpeedChartProps {
  data: WindData[]
}

export function WindSpeedChart({ data }: WindSpeedChartProps) {
  // Filter to last 1 hour (60 data points) and prepare chart data
  const oneHourData = data.slice(0, 60).reverse() // Show chronological order
  
  const chartData = oneHourData.map((item, index) => ({
    time: item.time,
    min: item.minSpeed,
    avg: item.avgSpeed,
    gusts: item.gusts,
    timestamp: item.timestamp,
    index: index
  }))

  // Calculate statistics for the hour
  const avgOfAvg = Math.round(oneHourData.reduce((sum, item) => sum + item.avgSpeed, 0) / oneHourData.length)
  const maxGust = Math.max(...oneHourData.map(item => item.gusts))
  const minWind = Math.min(...oneHourData.map(item => item.minSpeed))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm font-medium">{entry.name}:</span>
                </div>
                <span className="text-sm font-bold" style={{ color: entry.color }}>
                  {entry.value} kts
                </span>
              </div>
            ))}
          </div>
          {data && (
            <div className="mt-2 pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-600">
                Reading #{oneHourData.length - data.index} of last hour
              </p>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
              Wind Speed - Last Hour
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Real-time wind measurements from wind24.it • {oneHourData.length} readings
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{minWind}</div>
              <div className="text-xs text-blue-600">Min</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-sky-600">{avgOfAvg}</div>
              <div className="text-xs text-sky-600">Avg</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-amber-600">{maxGust}</div>
              <div className="text-xs text-amber-600">Max</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Wind Speed (knots)', angle: -90, position: 'insideLeft' }}
                domain={['dataMin - 1', 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="min" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Minimum"
                dot={{ fill: '#3b82f6', strokeWidth: 1, r: 2 }}
                activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="avg" 
                stroke="#0ea5e9" 
                strokeWidth={4}
                name="Average"
                dot={{ fill: '#0ea5e9', strokeWidth: 1, r: 3 }}
                activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="gusts" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Gusts"
                dot={{ fill: '#f59e0b', strokeWidth: 1, r: 2 }}
                activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2 }}
                strokeDasharray="8 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Enhanced Legend with Statistics */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-1 bg-blue-500 rounded"></div>
              <div>
                <div className="text-sm font-medium text-slate-700">Minimum Speed</div>
                <div className="text-xs text-slate-500">Lowest recorded wind speed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-1.5 bg-sky-500 rounded"></div>
              <div>
                <div className="text-sm font-medium text-slate-700">Average Speed</div>
                <div className="text-xs text-slate-500">Mean wind speed measurement</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-1 bg-amber-500 rounded border-dashed border-t-2 border-amber-500"></div>
              <div>
                <div className="text-sm font-medium text-slate-700">Wind Gusts</div>
                <div className="text-xs text-slate-500">Peak wind speed bursts</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}