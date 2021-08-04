export const CountrySimple = ({ name, country, show }) => {
    return (
        <li key={name}>
            {name}
            <button value={country.name} onClick={show}>
                Show
            </button>
        </li>
    )
}