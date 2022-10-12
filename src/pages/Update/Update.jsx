import React, {useEffect, useState} from 'react'
import './Update.css'
import Select from "react-select";
import {useCollection} from "../../hooks/useCollection";
import {timestamp} from "../../firebase/config";
import {useFirestore} from "../../hooks/useFirestore";
import {useNavigate} from "react-router-dom";

const categories =[
    {value:'development', label:"Development"},
    {value:'design', label:"Design"},
    {value:'sales', label:"Sales"},
    {value:'marketing', label:"Marketing"}
]

export default function Update({project}){
    const { documents } = useCollection('users')

    const [users, setUsers] = useState()

    const [updatedName, setName] = useState(project.name)
    const [details, setDetails] = useState(project.details)
    let [dueDate, setDueDate] =  useState('')
    const [category, setCategory] = useState(project.category)
    const [assignedUsers, setAssignedUsers] = useState(project.assignedUsersList)
    const [formError, setFormError] = useState(null)

    const  navigate = useNavigate();
    const{ updateDocument, response }= useFirestore('projects')

    useEffect(()=>{
        if(documents){
            const options = documents.map(user=>{
                return {value: user, label: user.displayName}
            })
            setUsers(options)
        }
    },[documents])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setFormError(null)

        if(!category){
            setFormError("Please select a project category")
            return;
        }
        if(assignedUsers.length < 1) {
            setFormError("Please assign the project to at least 1 user")
            return;
        }

        const assignedUsersList = assignedUsers.map((user)=>{
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })

        dueDate= timestamp.fromDate(new Date(dueDate))
        await  updateDocument(project.id, {name:updatedName,details, category,dueDate,assignedUsersList})
        if(!response.error){
            navigate(`/`)
        }
    }

    return(
        <div className={"create-form"}>
            <h2 className={"page-title"}>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type={"text"}
                        onChange={(e)=>setName(e.target.value)}
                        value={updatedName}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea
                        required
                        type={"text"}
                        onChange={(e)=>setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type={"date"}
                        onChange={(e)=>setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select
                        onChange={(option)=>setCategory(option)}
                        options={categories}
                        defaultValue={category}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        onChange={(options)=>setAssignedUsers(options)}
                        options = {users}
                        isMulti
                    />
                </label>

                <button className={"btn"}>Complete edit</button>

                {formError && <p className={"error"}>{formError}</p>}
            </form>
        </div>
    )
}