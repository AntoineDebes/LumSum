import Head from "next/head";
import Link from "next/link";
import BreadCrumb from "../../components/BreadCrumb";
import Footer from "../../layouts/Footer";
import { Typography, Divider, Table, Spin, Empty } from "antd";
import { useQuery } from "@apollo/react-hooks";
import competitionQuery from "src/graphql/competition.query";
import { TrophyOutlined } from "@ant-design/icons";

export default function LeaderBoard() {
    const { loading, error, data } = useQuery(competitionQuery, {
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <Spin />;

    if (error)
        return (
            <Empty>
                Can't find what you want... <Link href="/contact-us">Contact Us</Link>
            </Empty>
        );

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text: any, record: any, index: any) => <div>{index < 3 ? <TrophyOutlined className="winner" /> : index + 1}</div>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "No of Images",
            dataIndex: "images",
            key: "images",
        },
        {
            title: "Scores",
            dataIndex: "scores",
            key: "scores",
        },
    ];

    return (
        <>
            <Head>
                <link rel="icon" href="/lumsum.png" type="image/png" />
                <title>Leader Board | Lumsum</title>
            </Head>

            <main>
                <BreadCrumb title="Leader Board">
                    <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
                    <BreadCrumb.ItemLink href="/competition">Competition</BreadCrumb.ItemLink>
                    <BreadCrumb.Item>Leader Board</BreadCrumb.Item>
                </BreadCrumb>
                <div className="leader-board-container">
                    <div className="inner">
                        <Typography.Title style={{ margin: "0 0 8px 0", fontSize: 30 }}>Leader Board</Typography.Title>
                        <Divider style={{ margin: 0 }} />
                        <Table pagination={false} columns={columns} dataSource={data.getLeaderBoard} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
