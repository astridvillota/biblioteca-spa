import { QRCodeCanvas } from "qrcode.react";

export default function BookQRCode({
  open,
  onClose,
  book,
}) {

  if (!open || !book) return null;

  const qrValue = JSON.stringify({
    codigo: book.codigo,
    isbn: book.isbn,
    titulo: book.titulo,
    autor: book.autor,
    categoria: book.categoria,
    estado: book.estado,
  });

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold text-center mb-6">

          Código QR

        </h2>

        <div className="flex justify-center">

          <QRCodeCanvas
            value={qrValue}
            size={220}
            includeMargin={true}
          />

        </div>

        <div className="mt-6 space-y-2">

          <p>
            <strong>Código:</strong> {book.codigo}
          </p>

          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>

          <p>
            <strong>Título:</strong> {book.titulo}
          </p>

          <p>
            <strong>Autor:</strong> {book.autor}
          </p>

          <p>
            <strong>Categoría:</strong> {book.categoria}
          </p>

          <p>
            <strong>Estado:</strong> {book.estado}
          </p>

        </div>

        <div className="flex justify-center gap-3 mt-8">

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Imprimir
          </button>

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Cerrar
          </button>

        </div>

      </div>

    </div>

  );

}