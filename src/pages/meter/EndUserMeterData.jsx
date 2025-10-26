import React from 'react'
import ElectricityConsumptionOverviewGraph from '../../components/ui/charts/ElectricityConsumptionOverviewGraph'
import TableComponent from '../../components/ui/table/TableComponent'

export default function EndUserMeterData() {
    const dummyData1 = [
        { date: "2024-01-15", reading: 2999, difference: 0, notes: "Initial reading" },
        { date: "2024-02-15", reading: 4998, difference: 1999, notes: "Normal consumption" },
        { date: "2024-03-15", reading: 7498, difference: 2500, notes: "Increased usage" },
        { date: "2024-04-15", reading: 9298, difference: 1800, notes: "Efficient month" },
        { date: "2024-05-15", reading: 11498, difference: 2200, notes: "Stable usage" },
        { date: "2024-06-15", reading: 13448, difference: 1950, notes: "Summer begins" },
        { date: "2024-07-15", reading: 15548, difference: 2100, notes: "Peak season" },
        { date: "2024-08-15", reading: 17848, difference: 2300, notes: "High AC usage" },
        { date: "2024-09-15", reading: 20248, difference: 2400, notes: "Consistent usage" },
        { date: "2024-10-15", reading: 22148, difference: 1900, notes: "Moderate consumption" },
        { date: "2024-11-15", reading: 24748, difference: 2600, notes: "Winter preparation" },
        { date: "2024-12-15", reading: 27448, difference: 2700, notes: "Year-end high usage" }
    ];
    return (
        <div>
            <div><ElectricityConsumptionOverviewGraph /></div>
            <div>
                <TableComponent
                    dummyData={dummyData1}
                    columns={['date', 'reading', 'difference', 'notes']} // case-sensitive
                    pagination={false}
                />
            </div>
        </div>
    )
}
