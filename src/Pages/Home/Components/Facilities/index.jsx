import React from "react"
import './Facilities.scss'

const AdvertiserFacilities = () => {
    return(
        <div className="facilities">
            <div className="facilities-container">
                <div className="facilities-container-heading">
                    <h1>
                      FACILITIES <br /> FOR  <br /> ADVERTISERS
                    </h1>
                </div>
                <div className="facilities-container-facility">
                    <div className="facilities-container-facility-pt">
                        <img src="/asset/general/images/advt-post.png" alt="advertisement" />
                        PROMOTE ADVERTISEMENTS 
                    </div>
                    <div  className="facilities-container-facility-pt">
                        <img src="/asset/general/images/token.png" alt='token' />
                       LAUNCH TOKENIZED MODULES 
                    </div>
                    <div  className="facilities-container-facility-pt">
                        <img src="/asset/general/images/events.png" alt="events" />
                        POAP FOR EVENT ATTENDEES
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvertiserFacilities;