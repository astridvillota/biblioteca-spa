import BookForm from "./BookForm";

export default function BookModal({
  open,
  onSave,
  selectedBook,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <BookForm
          onSave={onSave}
          selectedBook={selectedBook}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}