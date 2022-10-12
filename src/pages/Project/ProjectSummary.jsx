import React, {useState} from "react";
import Avatar from "../../components/Avatar";
import {useFirestore} from "../../hooks/useFirestore";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";

export default function ProjectSummary({project, chooseEdit,edit}) {
    const navigate = useNavigate()
    const {deleteDocument} =useFirestore('projects')
    const {user} = useAuthContext()

    const handleClick = (e) =>{
        deleteDocument(project.id)
        navigate('/')
    }

    const  handleEdit =(e)=>{
        e.preventDefault()
        chooseEdit(true);
    }

    return(
        <div>
            <div className={"project-summary"}>
                <h2 className={"page-title"}>{project.name}</h2>
                <p>By  {project.createdBy.displayName} </p>
                <p className={"due-date"}>
                Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className={"details"}>
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                {project.assignedUsersList.map(user =>(
                    <div key={user.id}>
                        <Avatar src={user.photoURL}/>
                    </div>
                ))}
            </div>

            {user.uid===project.createdBy.id && !edit && (<button className={"btn-edit"} onClick={handleEdit}>Edit project</button>)}
            {user.uid===project.createdBy.id &&(
                <button className={"btn"} onClick={handleClick}>Mark as complete</button>
            )}
        </div>
    )
}