import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

interface TemperatureChartProps {
  data: WindData[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  // Prepare chart data (reverse to show chronological order)
  const chartData = data.slice().reverse().map(item => ({
    time: item.time,
    celsius: item.temperature,
    fahrenheit: Math.round((item.temperature * 9/5) + 32),
    timestamp: item.timestamp
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900">{label}</p>
          <p className="text-sm text-orange-600">
            Temperature: {data.celsius}°C ({data.fahrenheit}°F)
          </p>
        </div>
      )
    }
    return null
  }

  const minTemp = Math.min(...chartData.map(d => d.celsius))
  const maxTemp = Math.max(...chartData.map(d => d.celsius))
  const avgTemp = chartData.reduce((sum, d) => sum + d.celsius, 0) / chartData.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          Temperature Trends
        </CardTitle>
        <p className="text-sm text-slate-600">
          Temperature variations over the last hour
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="celsius" 
                stroke="#f97316" 
                strokeWidth={3}
                fill="url(#temperatureGradient)"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Temperature stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <div className="text-sm text-slate-600">Min</div>
            <div className="text-lg font-semibold text-blue-600">{minTemp.toFixed(1)}°C</div>
            <div className="text-xs text-slate-500">{Math.round((minTemp * 9/5) + 32)}°F</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-600">Avg</div>
            <div className="text-lg font-semibold text-orange-600">{avgTemp.toFixed(1)}°C</div>
            <div className="text-xs text-slate-500">{Math.round((avgTemp * 9/5) + 32)}°F</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-600">Max</div>
            <div className="text-lg font-semibold text-red-600">{maxTemp.toFixed(1)}°C</div>
            <div className="text-xs text-slate-500">{Math.round((maxTemp * 9/5) + 32)}°F</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}