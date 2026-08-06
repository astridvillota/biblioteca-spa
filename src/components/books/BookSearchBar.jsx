export default function BookSearchBar({
  value,
  onChange,
}) {
  return (
    <div className="flex justify-between items-center mb-6">

      <input
        type="text"
        placeholder="Buscar libro..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-2 w-80"
      />

    </div>
  );
}