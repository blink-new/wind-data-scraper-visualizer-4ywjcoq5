import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

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

interface DataTableProps {
  data: WindData[]
}

export function DataTable({ data }: DataTableProps) {
  const getWindColor = (speed: number) => {
    if (speed < 5) return 'bg-blue-500'
    if (speed < 10) return 'bg-green-500'
    if (speed < 15) return 'bg-yellow-500'
    if (speed < 20) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getDirectionColor = (direction: string) => {
    const colors = {
      'N': 'bg-blue-100 text-blue-800',
      'NE': 'bg-cyan-100 text-cyan-800',
      'E': 'bg-green-100 text-green-800',
      'SE': 'bg-lime-100 text-lime-800',
      'S': 'bg-yellow-100 text-yellow-800',
      'SW': 'bg-orange-100 text-orange-800',
      'W': 'bg-red-100 text-red-800',
      'NW': 'bg-purple-100 text-purple-800'
    }
    return colors[direction as keyof typeof colors] || 'bg-slate-100 text-slate-800'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
          Recent Wind Readings
        </CardTitle>
        <p className="text-sm text-slate-600">
          Detailed breakdown of wind measurements • Min, Average, Gusts & Direction
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-20 font-semibold">Time</TableHead>
                <TableHead className="text-center font-semibold text-blue-700">Min Speed</TableHead>
                <TableHead className="text-center font-semibold text-sky-700">Avg Speed</TableHead>
                <TableHead className="text-center font-semibold text-amber-700">Gusts</TableHead>
                <TableHead className="text-center font-semibold text-emerald-700">Direction</TableHead>
                <TableHead className="text-center font-semibold text-orange-700">Temperature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((reading) => (
                  <TableRow key={reading.id} className="hover:bg-slate-50">
                    <TableCell className="font-mono text-sm">
                      {reading.time}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-blue-600">
                          {reading.minSpeed}
                        </span>
                        <span className="text-xs text-blue-600/70">knots</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-sky-600">
                          {reading.avgSpeed}
                        </span>
                        <span className="text-xs text-sky-600/70">knots</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-amber-600">
                          {reading.gusts}
                        </span>
                        <span className="text-xs text-amber-600/70">knots</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getDirectionColor(reading.direction)}`}
                        >
                          {reading.direction}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {reading.degrees}°
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-orange-600">
                          {reading.temperature}°C
                        </span>
                        <span className="text-xs text-slate-500">
                          {Math.round((reading.temperature * 9/5) + 32)}°F
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {data.length > 0 && (
          <div className="mt-4 text-xs text-slate-500 text-center">
            Showing {data.length} most recent readings
          </div>
        )}
      </CardContent>
    </Card>
  )
}