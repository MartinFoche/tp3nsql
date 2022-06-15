import React, {useState} from 'react';

const Subscripcion = () => {

    const [canal, setcanal] = useState({
        canal:''
    });

    const handleChange = (e) => {
        setcanal({...canal, [e.target.name]: e.target.value});
        console.log(canal);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:4000/subscribir", {
            method: "POST",
            body: JSON.stringify(canal),
            headers: {"Content-Type": "application/json"}
        });

        window.location.href='/';

    };

    return (
        <div className="canal-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="canal" id="canal" placeholder="Canal" value={canal.canal} onChange={handleChange}>
                </input>
                <button type="submit">
                    Subscribir
                </button>
            </form>
        </div>
    );
}
 
export default Subscripcion;