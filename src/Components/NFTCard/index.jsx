import React, { useState } from "react"
import './NFTCard.scss'
import { Modal, Button, Popover } from "antd"

const NFTCard = (props) => {
    const [isRead, setIsRead] = useState(false);

    return (
        <div>
            <Modal className="modal-pop" footer={[
                <Button type="primary" onClick={() => setIsRead(false)} >  Done </Button>
            ]} style={{ fontFamily: "montserrat" }} title="Info" onCancel={() => setIsRead(false)} visible={isRead} onOk={() => setIsRead(false)}>
                <h3> Name </h3>
                <h4>
                    {props.nftData.name}
                </h4>

                <h3> About </h3>
                <p>
                    {props.nftData.about}
                </p>

                <h3> Contribution </h3>
                <p>{props.nftData.contribution}</p>
            </Modal>

            <div className="poa-nft-card">
                <img src={props.nftData.imageUrl} style={{ width: "80%", height: "40%", display: "block", margin: "0 auto 0 auto" }} alt="alt" />
                <Popover content={props.nftData.name}>
                    <h2> { props.nftData.name.length > 15 ? props.nftData.name.slice(0, 15) + "..." : props.nftData.name} </h2>
                </Popover>
                <h4><i><u>
                    About
                </u>
                </i></h4>
                <p>{props.nftData.about.length > 60 ? props.nftData.about.slice(0, 60) + "..." : props.nftData.about}</p>
                <h4><i><u>
                    Contribution
                </u>
                </i></h4>
                <p>{props.nftData.contribution.length > 60 ? props.nftData.contribution.slice(0, 60) + "..." : props.nftData.contribution}</p>
                <button onClick={() => setIsRead(true)}> Read full </button>
            </div>
        </div>
    )
}

export default NFTCard;