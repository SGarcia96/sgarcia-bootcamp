import Person from "./Person";

const ListPersons = ({ persons, newSearch, handleDeletePerson }) => {

    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => (
            <Person key={person.id} name={person.name} number={person.number} deletePerson={handleDeletePerson(person.name, person.id)} /> ))}
        </ul> 
    ) 
}

export default ListPersons