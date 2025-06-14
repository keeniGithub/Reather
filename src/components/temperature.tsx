import type { Forecast } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

type TemperatureProps = {
    data: Forecast
}

export default function Temperature({ data }: TemperatureProps) {
    const chartData = data.list.slice(0, 8).map(item => ({
        time: format(new Date(item.dt * 1000), 'HH:mm'),
        temp: item.main.temp.toFixed(1),
        feels_like: item.main.feels_like.toFixed(1)
    }))

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Today`s Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}℃`}/>

                            <Tooltip content={({active, payload}) => {
                                if(active && payload && payload.length) {
                                    const { time, temp, feels_like } = payload[0].payload
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <p className="text-sm font-medium">{time}</p>
                                            <div className="flex gap-2">
                                                <p className="text-sm flex flex-col text-left text-gray-300/80">Temperature <span className="font-bold text-lg text-white">{temp}℃</span></p>
                                                <p className="text-sm flex flex-col text-left text-gray-300/80">Feels like <span className="font-bold text-lg text-white">{feels_like}℃</span></p>
                                            </div>
                                        </div>
                                    );
                                }
                            }}/>

                            <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="feels_like" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
