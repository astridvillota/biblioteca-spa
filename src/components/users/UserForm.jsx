import { useEffect, useState } from "react";

const initialState = {
  documento: "",
  tipoDocumento: "CC",
  nombre: "",
  correo: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  fechaNacimiento: "",
  rol: "Miembro",
  estado: "Activo",
  observaciones: "",
  foto: "",
};

export default function UserForm({
  onSave,
  selectedUser,
  onCancel,
}) {

  const [form, setForm] = useState(initialState);

  useEffect(() => {

    if (selectedUser) {
      setForm({
        ...initialState,
        ...selectedUser,
      });
    } else {
      setForm(initialState);
    }

  }, [selectedUser]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setForm(prev => ({
        ...prev,
        foto: reader.result,
      }));

    };

    reader.readAsDataURL(file);

  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.documento ||
      !form.nombre ||
      !form.correo
    ) {
      alert("Complete los campos obligatorios.");
      return;
    }

    onSave(form);

  }

  return (

<form
onSubmit={handleSubmit}
className="bg-white rounded-xl p-6">

<h2 className="text-2xl font-bold mb-6">

{selectedUser ? "Editar Usuario" : "Nuevo Usuario"}

</h2>

<div className="grid md:grid-cols-2 gap-4">

<select
name="tipoDocumento"
value={form.tipoDocumento}
onChange={handleChange}
className="border rounded-lg p-3">

<option>CC</option>
<option>TI</option>
<option>CE</option>
<option>Pasaporte</option>

</select>

<input
name="documento"
placeholder="Documento"
value={form.documento}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="nombre"
placeholder="Nombre completo"
value={form.nombre}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="correo"
placeholder="Correo"
value={form.correo}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="telefono"
placeholder="Teléfono"
value={form.telefono}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="direccion"
placeholder="Dirección"
value={form.direccion}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="ciudad"
placeholder="Ciudad"
value={form.ciudad}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
type="date"
name="fechaNacimiento"
value={form.fechaNacimiento}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<select
name="rol"
value={form.rol}
onChange={handleChange}
className="border rounded-lg p-3">

<option>Administrador</option>
<option>Miembro</option>

</select>

<select
name="estado"
value={form.estado}
onChange={handleChange}
className="border rounded-lg p-3">

<option>Activo</option>
<option>Inactivo</option>

</select>

<div>

<label className="font-semibold block mb-2">

Fotografía

</label>

<input
type="file"
accept="image/*"
onChange={handleImage}
/>

</div>

<textarea
name="observaciones"
placeholder="Observaciones"
rows="4"
value={form.observaciones}
onChange={handleChange}
className="border rounded-lg p-3 md:col-span-2"
/>

</div>

{form.foto && (

<div className="mt-6">

<p className="font-semibold mb-2">

Vista previa

</p>

<img
src={form.foto}
alt="usuario"
className="w-32 h-32 rounded-full object-cover border"
/>

</div>

)}

<div className="flex gap-3 mt-6">

<button
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">

Guardar

</button>

<button
type="button"
onClick={onCancel}
className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">

Cancelar

</button>

</div>

</form>

  );

}