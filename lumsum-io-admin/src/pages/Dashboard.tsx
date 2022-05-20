import React, { FC, Fragment, useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { Row, Col, Card, Divider } from 'antd';
import { Helmet } from 'react-helmet';
import { useAuthContext } from '../context/AuthContext';
import Counts from '../components/Counts';
import UserChart from '../components/UserChart';

const Dashboard: FC = () => {
    const chartRef = useRef(null);
    const { state } = useAuthContext();

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctxCurrent: any = chartRef.current;
            const ctx = ctxCurrent.getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of users',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
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
    }, [chartRef]);

    return (
        <Fragment>
            <Helmet>
                <title>Lumsum | Dashboard</title>
            </Helmet>
            <Counts />
            <Divider />
            <Row>
                <Col span={24}>
                    <UserChart />
                </Col>
                {/* <Col span={12}>
                    <canvas ref={chartRef} width="100%" height="100%"></canvas>
                </Col> */}
            </Row>
        </Fragment>
    )
}

export default Dashboard;