import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const CustomPieChart = ({ 
    data, 
    label, 
    totalAmount, 
    colors, 
    showTextAnchor = false,
    height = 400, // Increased height for larger chart
    loading = false 
}) => {
    
    // Format currency for tooltips
    const formatCurrency = (value) => {
        return `$${new Intl.NumberFormat('en-US').format(value)}`
    }

    // Custom tooltip component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload
            const percentage = ((dataPoint.amount / totalAmount) * 100).toFixed(1)
            
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 mb-2">{dataPoint.name}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="font-medium text-green-600">
                            {formatCurrency(dataPoint.amount)}
                        </span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Percentage: <span className="font-medium text-blue-600">
                            {percentage}%
                        </span>
                    </p>
                </div>
            )
        }
        return null
    }

    // Custom label renderer for pie slices
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
        const RADIAN = Math.PI / 180
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                className="text-sm font-bold" // Larger text for percentages
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    // Custom legend content
    const renderLegend = (props) => {
        const { payload } = props
        return (
            <ul className="flex flex-wrap justify-center gap-4 mt-6">
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center gap-2">
                        <div 
                            className="w-4 h-4 rounded-full" // Larger legend indicator
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {entry.value}: {formatCurrency(entry.payload?.amount || 0)}
                        </span>
                    </li>
                ))}
            </ul>
        )
    }

    // If loading, show skeleton
    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
                <div className="h-80 w-80 bg-gray-100 rounded-full animate-pulse" />
            </div>
        )
    }

    // If no data or empty data
    if (!data || data.length === 0 || data.every(item => item.amount === 0)) {
        return (
            <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
                <div className="text-center text-gray-400">
                    <p className="text-sm">No financial data available</p>
                    <p className="text-xs mt-1">Add transactions to see your overview</p>
                </div>
            </div>
        )
    }

    // Filter out zero amounts to avoid empty slices
    const filteredData = data.filter(item => item.amount > 0)

    return (
        <div style={{ width: '100%', height: `${height}px` }}>
            {showTextAnchor && (
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-3xl font-bold text-gray-800">{totalAmount}</p>
                </div>
            )}
            
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={filteredData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={showTextAnchor ? 140 : 160} // MUCH LARGER radius!
                        innerRadius={showTextAnchor ? 80 : 60}   // Adjusted inner radius proportionally
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="name"
                        paddingAngle={1} // Slightly more padding for better separation
                    >
                        {filteredData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={colors[index % colors.length]}
                                stroke="white"
                                strokeWidth={1} // Thicker stroke for better definition
                                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomPieChart