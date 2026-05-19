import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceDot,
    Area
} from 'recharts'

const CustomLineChart = ({ data, loading, height = 400, type }) => {
    // Format currency for tooltips and axis
    const formatCurrency = (value) => {
        return `$${new Intl.NumberFormat('en-US').format(value)}`
    }

    // Custom tooltip component with detailed information
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 mb-2">{dataPoint.month}</p>
                    <p className="text-sm text-gray-600">
                        Date: <span className="font-medium">{dataPoint.date}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Total Amount: <span className="font-medium text-green-600">
                            {formatCurrency(dataPoint.totalAmount)}
                        </span>
                    </p>
                </div>
            )
        }
        return null
    }

    // Custom dot with hover effects
    const CustomDot = ({ cx, cy }) => {

        let dotColor = "#6100bd"
        let dotSize = 6
        return (
            <circle
                cx={cx}
                cy={cy}
                r={dotSize}
                fill={dotColor}
                stroke="white"
                strokeWidth={2}
                className="cursor-pointer transition-all duration-200 hover:r-8"
            />
        )
    }

    // Custom label for data points (shows amount on hover)
    const CustomActiveDot = ({ cx, cy }) => {
        return (
            <g>
                <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="#8884d8"
                    stroke="white"
                    strokeWidth={2}
                    className="animate-pulse"
                />
                <circle
                    cx={cx}
                    cy={cy}
                    r={12}
                    fill="#8884d8"
                    fillOpacity={0.3}
                    stroke="none"
                />
            </g>
        )
    }

    // If no data, show placeholder
    if (!data) {
        return (
            <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
                <div className="text-center text-gray-400">
                    <p className="text-sm">No {type} data available</p>
                    <p className="text-xs mt-1">Add transactions to see your {type} overview</p>
                </div>
            </div>
        )
    }

    if (loading) return <div className="h-96 w-full bg-gray-100 animate-pulse rounded-lg" />

    return (
        <div style={{ width: '100%', height: `${height}px` }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>

                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6100bd" stopOpacity={0.45} />
                            <stop offset="50%" stopColor="#6100bd" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="#6100bd" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatCurrency} />

                    <Tooltip content={<CustomTooltip />} />

                    {/* ✅ Gradient background */}
                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="none"
                        fill="url(#gradient)"
                    />

                    {/* ✅ Main line */}
                    <Line
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#6100bd"
                        strokeWidth={3}
                        dot={<CustomDot />}
                        activeDot={<CustomActiveDot />}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart