import { Descriptions } from 'antd';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const Dashboard: FC = () => {
    return (
        <div>
            <Helmet>
                <title>Lumsum | Profile | Admin</title>
            </Helmet>
            <Descriptions title="Profile Info">
                <Descriptions.Item label="UserName">Zhou Mao mao</Descriptions.Item>
                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default Dashboard;