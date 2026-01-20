const handleDelete = (name,onClick)=>{
    if(window.confirm(`Delete ${name}?`)){
        onClick()
    }
}
const DeleteButton = ({name,onClick}) =>{
    return (
        <button onClick = {()=>handleDelete(name,onClick)}>
            delete
        </button>
    )
}

export default DeleteButton