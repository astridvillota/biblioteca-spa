import { useBooks } from "../../context/BookContext";

export default function Statistics() {

    const { books } = useBooks();

    const categorias = {};

    books.forEach((book)=>{

        categorias[book.categoria] =
            (categorias[book.categoria] || 0) + 1;

    });

    return(

<div className="bg-white rounded-xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

Estadísticas de Libros

</h2>

<table className="w-full">

<thead>

<tr className="border-b">

<th className="text-left p-2">

Categoría

</th>

<th className="text-right p-2">

Cantidad

</th>

</tr>

</thead>

<tbody>

{

Object.entries(categorias).map(

([categoria,cantidad])=>(

<tr
key={categoria}
className="border-b">

<td className="p-2">

{categoria}

</td>

<td
className="text-right p-2 font-bold">

{cantidad}

</td>

</tr>

)

)

}

</tbody>

</table>

</div>

)

}