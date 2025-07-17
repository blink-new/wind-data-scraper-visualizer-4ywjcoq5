import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Wind, Navigation } from 'lucide-react'

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

interface CurrentConditionsProps {
  data: WindData
}

export function CurrentConditions({ data }: CurrentConditionsProps) {
  if (!data) return null

  // Get color based on average wind speed according to user's requirements
  const getWindColor = (avgSpeed: number) => {
    if (avgSpeed < 10) return 'bg-red-500'
    if (avgSpeed >= 10 && avgSpeed <= 15) return 'bg-green-500'
    return 'bg-violet-500'
  }

  const getWindColorText = (avgSpeed: number) => {
    if (avgSpeed < 10) return 'text-red-600'
    if (avgSpeed >= 10 && avgSpeed <= 15) return 'text-green-600'
    return 'text-violet-600'
  }

  const getWindColorBorder = (avgSpeed: number) => {
    if (avgSpeed < 10) return 'border-red-200 bg-red-50/50'
    if (avgSpeed >= 10 && avgSpeed <= 15) return 'border-green-200 bg-green-50/50'
    return 'border-violet-200 bg-violet-50/50'
  }

  const windColor = getWindColor(data.avgSpeed)
  const windColorText = getWindColorText(data.avgSpeed)
  const windColorBorder = getWindColorBorder(data.avgSpeed)

  return (
    <Card className={`w-full ${windColorBorder}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Current Wind Conditions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {data.date} at {data.time}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Minimum Wind */}
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Minimum</div>
            <div className="text-2xl font-bold">{data.minSpeed}</div>
            <div className="text-xs text-muted-foreground">knots</div>
          </div>
          
          {/* Average Wind - Color coded */}
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Average</div>
            <div className={`text-3xl font-bold ${windColorText}`}>
              {data.avgSpeed}
            </div>
            <div className="text-xs text-muted-foreground">knots</div>
            <div className={`w-full h-2 ${windColor} rounded-full mt-2`}></div>
          </div>
          
          {/* Gust Wind */}
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Gusts</div>
            <div className="text-2xl font-bold">{data.gusts}</div>
            <div className="text-xs text-muted-foreground">knots</div>
          </div>
          
          {/* Wind Direction */}
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Direction</div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{data.direction}</div>
                <div className="text-xs text-muted-foreground">{data.degrees}°</div>
              </div>
              <div 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 ml-2"
                style={{ transform: `rotate(${data.degrees}deg)` }}
              >
                <Navigation className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wind Speed Legend */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>&lt; 10 knots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>10-15 knots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
              <span>&gt; 15 knots</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}