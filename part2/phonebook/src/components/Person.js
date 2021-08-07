import { ButtonDelete } from "./ButtonDelete";

export const Person = ({ name, number, deletePerson }) => {
    return (
        <li className='person'>
            {name} 
            {number}
            <ButtonDelete handleDelete={deletePerson}/>
        </li>
    )
}

export default Person;