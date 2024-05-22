import { useSelector, useDispatch } from "react-redux";
import { changeSearchField } from "../actions/actionCreators";

export default function Skills() {
  const { search, items, loading, error } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const { value } = e.target;

    dispatch(changeSearchField(value));
  }

  const hasQuery = search.trim() !== "";
  
  return (
    <main>
      <input
        type="search"
        value={search}
        onChange={handleSearch}
      />
      {!hasQuery && <p>Type something to search...</p>}
      {hasQuery && loading && <p>searching...</p>}
      {hasQuery && !loading && !error &&
        <ul>
          {items.map((o) => (
            <li key={o.id}>{o.name}</li>
          ))}
        </ul>
      }
      {error && <p>Error occured</p>}
    </main>
  );
}
