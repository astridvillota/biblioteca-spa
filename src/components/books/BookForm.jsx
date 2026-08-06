import { useState, useEffect } from "react";

const initialState = {
  isbn: "",
  codigo: "",
  titulo: "",
  autor: "",
  editorial: "",
  edicion: "",
  idioma: "Español",
  categoria: "",
  ubicacion: "",
  descripcion: "",
  anio: "",
  cantidad: 1,
  disponibles: 1,
  estado: "Disponible",
  portada: "",
};

export default function BookForm({
  onSave,
  selectedBook,
  onCancel,
}) {

  const [form, setForm] = useState(initialState);

  useEffect(() => {

    if (selectedBook) {

      setForm({
        ...initialState,
        ...selectedBook,
      });

    } else {

      setForm(initialState);

    }

  }, [selectedBook]);

  function handleChange(e){

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  function handleImage(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setForm(prev => ({
        ...prev,
        portada: reader.result,
      }));

    };

    reader.readAsDataURL(file);

  }

  function handleSubmit(e){

    e.preventDefault();

    if(
      !form.isbn ||
      !form.titulo ||
      !form.autor ||
      !form.categoria
    ){

      alert("Complete los campos obligatorios");

      return;

    }

    onSave({
      ...form,
      cantidad:Number(form.cantidad),
      disponibles:Number(form.disponibles),
      anio:Number(form.anio),
    });

  }

  return (

<form
onSubmit={handleSubmit}
className="bg-white rounded-xl p-6">

<h2 className="text-2xl font-bold mb-6">

{selectedBook ? "Editar Libro" : "Nuevo Libro"}

</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
name="isbn"
placeholder="ISBN"
value={form.isbn}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="codigo"
placeholder="Código"
value={form.codigo}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="titulo"
placeholder="Título"
value={form.titulo}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="autor"
placeholder="Autor"
value={form.autor}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="editorial"
placeholder="Editorial"
value={form.editorial}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="edicion"
placeholder="Edición"
value={form.edicion}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
type="number"
name="anio"
placeholder="Año"
value={form.anio}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="idioma"
placeholder="Idioma"
value={form.idioma}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="categoria"
placeholder="Categoría"
value={form.categoria}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
name="ubicacion"
placeholder="Ubicación"
value={form.ubicacion}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
type="number"
name="cantidad"
placeholder="Cantidad"
value={form.cantidad}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<input
type="number"
name="disponibles"
placeholder="Disponibles"
value={form.disponibles}
onChange={handleChange}
className="border rounded-lg p-3"
/>

<select
name="estado"
value={form.estado}
onChange={handleChange}
className="border rounded-lg p-3">

<option>Disponible</option>
<option>Prestado</option>
<option>Agotado</option>
<option>Dañado</option>
<option>En reparación</option>

</select>

<div>

<label className="block font-semibold mb-2">

Portada del libro

</label>

<input
type="file"
accept="image/*"
onChange={handleImage}
/>

</div>

<textarea
name="descripcion"
placeholder="Descripción"
rows="4"
value={form.descripcion}
onChange={handleChange}
className="border rounded-lg p-3 md:col-span-2"
/>

</div>

{form.portada && (

<div className="mt-6">

<p className="font-semibold mb-2">

Vista previa

</p>

<img
src={form.portada}
alt="portada"
className="w-40 rounded-lg shadow"
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