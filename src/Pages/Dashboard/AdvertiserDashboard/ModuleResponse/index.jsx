import React, { useEffect, useContext, useState } from "react"
import './ModuleResponse.scss'
import { Card, List } from "antd"
import { UserContext } from "../../../../Provider/UserProvider"
import { ContractContext } from "../../../../Provider/ContractProvider"
import { getALlModuleResponses } from "../../../../Services/AdvertiserUtilities"
import { useMoralis } from "react-moralis"
import Loader from '../../../../Components/Loader/index'
import toast, { Toaster } from "react-hot-toast"

const ModuleResponse = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const [responses, setResponses] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    const backgroundStyling = {
        backgroundImage: `url("/asset/general/images/lfg-6.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    const getResponses = async () => {
        try {
            setLoadingState(true)
            let responses = await getALlModuleResponses(user.id);
            console.log(user.id);
            console.log("there are responses", responses);
            setResponses(responses);
            setLoadingState(false);
        } catch (err) {
            toast.error("Something bad happened");
            setLoadingState(false);
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (user) {
            getResponses();
        }
    }, [user])

    return (
        <>
            <Loader isLoading={loadingState} message={"Loading Responses..."} >
                <Toaster />
                <div className="module-dashboard">
                    <div className="module-dashboard-bg" style={backgroundStyling}>
                        <h1> Module responses </h1>
                        <p> Manager and walk take walk over responses </p>
                    </div>
                    <div className="module-dashboard-content">
                        <div className="responses-page">
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 1,
                                }}
                                dataSource={responses}
                                renderItem={(item) => (
                                    <Card
                                        style={{ marginTop: "30px", fontFamily: "montserrat" }}
                                        title={"Module name: " + item.name}
                                    >
                                        {item.responses.map((data, id) => (
                                            <Card>
                                                {data.answers.map((res, id) => {
                                                    return (
                                                        <>
                                                            <h3 className="resp"> Response for question {++id} </h3>
                                                            <p className="res">
                                                                {res}
                                                            </p>
                                                        </>
                                                    )
                                                })}
                                            </Card>
                                        ))}
                                    </Card>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </Loader>
        </>
    )
}

export default ModuleResponse;