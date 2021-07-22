import HandleChange from "./HandleChange"

const FormPerson = ({ handleSubmit, handleChangeName, handleChangeNumber, newName, newNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <HandleChange handleChange={handleChangeName} value={newName} />
          number: <HandleChange handleChange={handleChangeNumber} value={newNumber} />
        </div> 
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default FormPerson