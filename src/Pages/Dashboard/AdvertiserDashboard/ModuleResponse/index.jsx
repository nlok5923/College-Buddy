import React, { useEffect, useContext, useState } from "react"
import './ModuleResponse.scss'
import { Card } from "antd"
import { UserContext } from "../../../../Provider/UserProvider"
import { ContractContext } from "../../../../Provider/ContractProvider"
import { getALlModuleResponses } from "../../../../Services/AdvertiserUtilities"

const ModuleResponse = () => {
    
    const contractData = useContext(ContractContext);
    const { user, isLoading } = useContext(UserContext);
    const [responses, setResponses] = useState([]);

    const getResponses = async () => {
        try {
            let responses = await getALlModuleResponses(user.uid);
            console.log(user.uid);
            console.log("there are responses", responses);
            setResponses(responses);
        } catch (err) {
            console.log(err.message);
        }
    } 

    useEffect(() => {
        if(user) {
            getResponses();
        }
    }, [user])

    return (
        <div className="responses-page">

            {
                responses.map((data, id) => {
                    return (
                        <Card 
                        title = {data.name}
                        >
                            {
                                // data.responses.map(())
                            }
                        </Card>
                    )
                })
            }
            <Card
            title="Default size card"
            >

            </Card>
        </div>
    )
}

export default ModuleResponse;