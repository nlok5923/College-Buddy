import React from 'react'
import './Gauge.scss'
import GaugeChart from 'react-gauge-chart'

const PerformanceGauge = (props) => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}> Performance Guage </h1>
            <GaugeChart id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.3, 0.5, 0.2]}
                colors={['#C7EEFF', '#82CCEC', '#4D6DE3']}
                percent={props.score}
                arcPadding={0.02}
                textColor={"#000000"}
                // formatTextValue={value => 'score ' + value}
            />
        </div>
    )
}

export default PerformanceGauge;