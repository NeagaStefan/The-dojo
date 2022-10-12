import React, {useState} from 'react'
import './Project.css'
import { useParams} from "react-router-dom";
import {useDocument} from "../../hooks/useDocument";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
import Update from "../Update/Update";

export default function Project() {
    const [edit, setEdit]=useState(false)
    const { id } = useParams()
    const {document, error} = useDocument('projects', id)

    if( error ){
        return <div className={"error"}>{error}</div>
    }
    if(!document){
        return <div className={"loading"}>Loading...</div>
    }
    const chooseEdit=(edit)=>{
        setEdit(edit)
    }

    return(
        <div>
        <div className={"project-details"}>
            {!edit &&(
                <>
            <ProjectSummary project={document} chooseEdit={chooseEdit} edit={edit} />
            <ProjectComments project={document}/>
                </>)}
            {edit && <Update project ={document}  />}
        </div>
        <div>

        </div>
        </div>

    )
}