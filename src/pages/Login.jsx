import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [error,setError]=useState("");

    const ingresar=(e)=>{

        e.preventDefault();

        const ok=login(email,password);

        if(ok){

            navigate("/dashboard");

        }else{

            setError("Credenciales incorrectas");

        }

    }

    return(

<div className="min-h-screen flex items-center justify-center bg-slate-200">

<form
onSubmit={ingresar}
className="bg-white p-10 rounded-xl shadow-xl w-96">

<h1 className="text-3xl font-bold mb-6 text-center">

Biblioteca SPA

</h1>

<input

className="border w-full p-3 rounded mb-4"

placeholder="Correo"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

className="border w-full p-3 rounded mb-4"

placeholder="Contraseña"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

{error &&

<p className="text-red-600 mb-3">

{error}

</p>

}

<button

className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded">

Ingresar

</button>

<div className="mt-6 text-sm">

<p>

Administrador

</p>

<p>

admin@biblioteca.com

</p>

<p>

123456

</p>

<br/>

<p>

Miembro

</p>

<p>

usuario@biblioteca.com

</p>

<p>

123456

</p>

</div>

</form>

</div>

)

}