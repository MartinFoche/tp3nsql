import React, {useState} from 'react';


const Canal = ({nombre}) => {

    const [activos, setActivos] = useState()

    const cantidad_activos = async () => {
        const response = await fetch(`http://localhost:4000/activoscanal/${nombre}`);
        const data = await response.json();
        setActivos(data[1]);
    };

    cantidad_activos();

    const handleClick = async () => {

        await fetch(`http://localhost:4000/desubscribir/${nombre}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
        window.location.href = '/';
    }

    return (
        <div className="channel-container">
            <p className="channel-name">{nombre}</p>
            <div className="btn-container">
                <p className="activos">Activos: {activos}</p>
                <input className="btn-name" type="button" value="Desubscribir" onClick={handleClick} />
            </div>
        </div>
    );
}
 
export default Canal;