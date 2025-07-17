import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

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

interface WindDirectionCompassProps {
  data: WindData[]
}

export function WindDirectionCompass({ data }: WindDirectionCompassProps) {
  const currentData = data[0]
  
  if (!currentData) return null

  // Calculate direction frequency for the last 10 readings
  const recentData = data.slice(0, 10)
  const directionCounts = recentData.reduce((acc, item) => {
    acc[item.direction] = (acc[item.direction] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const directionDegrees = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          Wind Direction
        </CardTitle>
        <p className="text-sm text-slate-600">
          Current direction and recent patterns
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          {/* Compass */}
          <div className="relative w-48 h-48">
            {/* Compass circle */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
              {/* Direction markers */}
              {directions.map((dir, index) => {
                const angle = directionDegrees[index]
                const isActive = dir === currentData.direction
                const count = directionCounts[dir] || 0
                
                return (
                  <div
                    key={dir}
                    className="absolute w-8 h-8 flex items-center justify-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)`
                    }}
                  >
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                      ${isActive 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : count > 0 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-500'
                      }
                    `}>
                      {dir}
                    </div>
                  </div>
                )
              })}
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-slate-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Wind arrow */}
              <div
                className="absolute top-1/2 left-1/2 origin-bottom"
                style={{
                  transform: `translate(-50%, -50%) rotate(${currentData.degrees}deg)`
                }}
              >
                <div className="w-1 h-16 bg-emerald-500 relative">
                  {/* Arrow head */}
                  <div className="absolute -top-2 -left-1 w-3 h-3 bg-emerald-500 transform rotate-45"></div>
                  {/* Arrow tail */}
                  <div className="absolute -bottom-1 -left-0.5 w-2 h-4 bg-emerald-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Current reading */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-emerald-600">
              {currentData.direction}
            </div>
            <div className="text-lg text-slate-600">
              {currentData.degrees}°
            </div>
            <Badge variant="secondary" className="text-sm">
              {currentData.avgSpeed} knots from {currentData.direction}
            </Badge>
          </div>

          {/* Direction frequency */}
          <div className="w-full">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Recent Direction Pattern</h4>
            <div className="grid grid-cols-4 gap-2">
              {directions.map(dir => {
                const count = directionCounts[dir] || 0
                const percentage = recentData.length > 0 ? (count / recentData.length) * 100 : 0
                
                return (
                  <div key={dir} className="text-center">
                    <div className="text-xs font-medium text-slate-600 mb-1">{dir}</div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{count}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}