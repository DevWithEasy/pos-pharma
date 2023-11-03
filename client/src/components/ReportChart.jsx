import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ReportChart = ({reports}) => {
    const date = new Date()
    const [year,setYear] = useState(date.getFullYear().toString()) 
    const years = [... new Set(reports.map(report=>report.year))]
    const findReports = reports.filter(report=>report.year === year)
    const labels = findReports.map(report=>report.month)

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'bottom',
            },
            title: {
            display: true,
            text: `${year} total purchases and sales value`,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
            label: 'Purchase',
            data: findReports.map((report) =>  report.purchase),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
            label: 'sale',
            data: findReports.map((report) =>  report.sale),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
        };
    return (
        <div
            className='w-full bg-white border rounded p-2'
        >
            <select
                value={year}
                onChange={(e)=>setYear(e.target.value)}
                className='px-2 py-1 border focus:outline-none focus:border-sky-500 rounded'
            >
                {
                    years.map((year, i) =><option
                        key={i}
                        value={year}
                    >
                        {year}
                    </option>)
                }
            </select>
            <Bar options={options} data={data} />
        </div>
    );
};

export default ReportChart;