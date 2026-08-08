import { QRCodeCanvas } from "qrcode.react";

export default function UserCarnet({ user, onClose }) {
  if (!user) return null;

  const qrValue = JSON.stringify({
    documento: user.documento,
    nombre: user.nombre,
    correo: user.correo,
    rol: user.rol,
    estado: user.estado,
  });

  function imprimirCarnet() {
    window.print();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Encabezado */}
        <div className="bg-blue-700 text-white text-center px-6 py-5">
          <div className="text-3xl mb-1">📚</div>

          <h2 className="text-2xl font-bold">
            Biblioteca SPA
          </h2>

          <p className="text-blue-100 text-sm">
            Carnet de Usuario
          </p>
        </div>

        {/* Carnet */}
        <div className="p-6">

          {/* Foto */}
          <div className="flex justify-center mb-4">
            {user.foto ? (
              <img
                src={user.foto}
                alt={user.nombre}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-5xl">
                👤
              </div>
            )}
          </div>

          {/* Nombre */}
          <h3 className="text-2xl font-bold text-center text-slate-800">
            {user.nombre}
          </h3>

          <p className="text-center text-gray-500 mb-5">
            {user.rol}
          </p>

          {/* Información */}
          <div className="space-y-2 text-sm">

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">
                Documento
              </span>

              <span>
                {user.documento}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">
                Correo
              </span>

              <span className="text-right ml-4 break-all">
                {user.correo}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">
                Teléfono
              </span>

              <span>
                {user.telefono || "-"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">
                Estado
              </span>

              <span
                className={`font-semibold ${
                  user.estado === "Activo"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {user.estado}
              </span>
            </div>

          </div>

          {/* QR */}
          <div className="flex flex-col items-center mt-6">

            <QRCodeCanvas
              value={qrValue}
              size={150}
              includeMargin={true}
            />

            <p className="text-xs text-gray-500 mt-2">
              Código de identificación
            </p>

          </div>

          {/* Botones */}
          <div className="flex justify-center gap-3 mt-6">

            <button
              onClick={imprimirCarnet}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              🖨️ Imprimir
            </button>

            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Cerrar
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}