function UserOptions({type,value,setValue,id,label}) {
    return (
        
        <div className="form-floating">
            <input  type={type} value={value} className="form-control inputRadius" onChange={e => setValue(e.target.value)} id={id} required/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default UserOptions
