import { ButtonDelete } from "./ButtonDelete";

export const Person = ({ name, number, deletePerson }) => {
    return (
        <li>
            <p>
                {name} 
                {number}
                <ButtonDelete handleDelete={deletePerson}/>
            </p>
        </li>
    )
}

export default Person;