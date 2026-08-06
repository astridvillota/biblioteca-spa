import UserForm from "./UserForm";

export default function UserModal({
  open,
  onSave,
  selectedUser,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <UserForm
          onSave={onSave}
          selectedUser={selectedUser}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}