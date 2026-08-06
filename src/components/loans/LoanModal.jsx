import LoanForm from "./LoanForm";

export default function LoanModal({
  open,
  onSave,
  selectedLoan,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <LoanForm
          onSave={onSave}
          selectedLoan={selectedLoan}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}