import React from "react"
import './POACard.scss'
import { Card, Avatar, Popover } from 'antd'

const POACard = (props) => {
    const { Meta } = Card;
    console.log("paops ", props);
    return (
        <Card
            style={{
                width: 300,
                fontFamily: "montserrat"
            }}
            cover={
                <img
                    alt="example"
                    src={props.nftData.imageUrl}
                />
            }
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={props.nftData.name}
                description={props.nftData.about.length > 60 ? <Popover content={props.nftData.about}>
                    {props.nftData.about.slice(0, 60) + "..."}
                </Popover>
                    : props.nftData.about}
            />
            <h3 className="contribution"> Contribution </h3>
            <p> {props.nftData.contribution.length > 60 ? <Popover content={props.nftData.contribution}>
                {props.nftData.contribution.slice(0, 60) + "..."}
            </Popover>
                : props.nftData.contribution} </p>
        </Card>
    )
}

export default POACard;