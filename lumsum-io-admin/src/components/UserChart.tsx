import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import Chart from 'chart.js';
import moment from 'moment';
import { useAuthContext } from '../context/AuthContext';
import { DatePicker, Space } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

declare global {
    interface Window {
        chartColors: any;
    }
}

const CHART_DATA = gql`
    query chartData($year: String) {
        chartData(year: $year) {
            labels
            dataset {
                suppliers
                users
                categories
                products
            }
        }
    }
`;

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
}

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}

const UserChart: FC = () => {
    const chartRef = useRef(null);
    const { state } = useAuthContext();
    const [year, setYear] = useState("2020");
    const { loading, error, data } = useQuery(CHART_DATA, {
        variables: { year }
    });
    console.log({ loading, error, data });

    useEffect(() => {
        console.log(data?.chartData)
        if (chartRef && chartRef.current) {
            const ctxCurrent: any = chartRef.current;
            const ctx = ctxCurrent.getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data?.chartData?.labels || [],
                    datasets: [
                        {
                            label: '# of customers',
                            fill: false,
                            borderColor: '#049e94',
                            backgroundColor: '#049e94',
                            data: data?.chartData?.dataset?.users || [],
                            borderWidth: 1
                        },
                        {
                            label: '# of suppliers',
                            fill: false,
                            borderColor: 'red',
                            backgroundColor: 'red',
                            data: data?.chartData?.dataset?.suppliers || [],
                            borderWidth: 1
                        },
                        {
                            label: '# of categories',
                            fill: false,
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            data: data?.chartData?.dataset?.categories || [],
                            borderWidth: 1
                        },
                        {
                            label: '# of products',
                            fill: false,
                            borderColor: 'yellow',
                            backgroundColor: 'yellow',
                            data: data?.chartData?.dataset?.products || [],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }, [chartRef, data?.chartData]);

    const onChange = (date: any, dateString: any) => {
        console.log(date, dateString);
        setYear(dateString);
    }

    return (
        <Container>
            <DatePikerWraper>
                <DatePicker onChange={onChange} picker="year" defaultValue={moment()} />
            </DatePikerWraper>
            <canvas ref={chartRef}></canvas>
            {/* <Line data={data} options={options} /> */}
        </Container>
    )
}

export default UserChart;

const DatePikerWraper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Container = styled.div`
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 15px;
`;