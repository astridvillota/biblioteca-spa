import { IconContext } from "react-icons";

export default function StatCard({
    title,
    value,
    icon,
    color = "bg-blue-600"
}) {

    return (

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">

            <div>

                <p className="text-gray-500 text-sm">

                    {title}

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {value}

                </h2>

            </div>

            <div className={`${color} text-white p-4 rounded-xl`}>

                <IconContext.Provider value={{ size: "30px" }}>

                    {icon}

                </IconContext.Provider>

            </div>

        </div>

    );

}