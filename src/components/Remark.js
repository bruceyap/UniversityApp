import React, { useEffect, useRef, useState } from 'react'

function Remark({remarks, updateRemark, deleteRemark}) {
   
    const [isEditing, setIsEditing] = useState(false);
    const [editedRemark, setEditedRemark] = useState(remarks);
 
    const handleEdit = () =>{
        setIsEditing(true);
    };

    const handleDelete = () =>{
        setEditedRemark("");
        deleteRemark();
    };

    const handleCancel = () =>{
        setEditedRemark(remarks);
        setIsEditing(false);
    };

    const handleSave = () => {
        updateRemark(editedRemark);
        setIsEditing(false);
    };
    const inputRef = useRef(null);
        
    useEffect(()=>{
        if(isEditing){
            inputRef.current.focus();
        }
     });
    
    return(

        <div className='remark-content'>
            <strong>Remarks</strong>
            {isEditing ? (
            <div>
                <input
                type="text"
                value={editedRemark}
                ref={inputRef}
                onChange={(event) => setEditedRemark(event.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
            ) : 
            editedRemark ? 
            (
                <div>
                    <p>{remarks}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) :
            (
                <div>
                    <p>{remarks}</p>
                    <button onClick={handleEdit}>Add</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )
            }
        </div>
    );
}

export default Remark;