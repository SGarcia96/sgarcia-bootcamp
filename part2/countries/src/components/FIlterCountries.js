export const FilterCountries = ({ newSearch, handleSearchChange }) => {
  return (
    <form>
      find countries
      <input value={newSearch} onChange={handleSearchChange} />
      <br />
    </form>
  );
};