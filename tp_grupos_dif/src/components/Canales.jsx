import React, { useEffect, useState} from 'react';
import Canal from './Canal';

const Canales = () => {
    const [canales, setCanales] = useState([]);

    const cargarCanales = async () => {
        const response = await fetch("http://localhost:4000/activos");
        const data = await response.json();
        setCanales(data);
        console.log(data);
    };


    useEffect(() => {
        cargarCanales();
    }, []);

    return (
        <div className="canales-container">
            <h2>Canales Activos</h2>
            {
                canales.map( canal => {
                    return <Canal
                            key={canal}
                            nombre={canal}
                            />
                })
            }    
        </div>
    );
}

export default Canales;