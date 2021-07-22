import Person from "./Person";

const ListPersons = ({ persons, newSearch }) => {
    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => (
            <Person key={person.name} name={person.name} number={person.number} /> ))}
        </ul> 
    ) 
}

export default ListPersons