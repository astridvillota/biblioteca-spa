export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Buscar libro..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-96 border rounded-lg p-2"
    />
  );
}