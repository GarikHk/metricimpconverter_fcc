import React, { useState } from 'react';

export default function App() {
    const [formData, setFormData] = useState({ input: "" })
    const [result, setResult] = useState("");
    const [display, setDisplay] = useState(false)

    function handleChange(event) {
        const { value } = event.target
        setFormData({ input: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = `http://localhost:3000/api/convert?input=${formData.input}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setResult(data);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="wrapper">

            <header className="header">
                <h1>Metric/Imperial Converter</h1>
            </header>
            <main>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="convertField"
                        name="input"
                        placeholder="3.1mi"
                        onChange={handleChange}
                        value={formData.input}
                    />
                    <button>Convert!</button>
                </form>
                <p className="result">{result.string ? result.string : result}</p>
                {
                    result && (
                        <button
                            onClick={() => setDisplay(prev => !prev)}
                            className="jsonToggler"
                        >
                            {display ? "Hide JSON" : "See JSON"}
                        </button>
                    )
                }
                {
                    display
                        ? (
                            <div className="jsonResult">
                                <code>{JSON.stringify(result, null, 2)}</code>
                            </div>
                        )
                        : ""
                }

            </main>

        </div>
    );
};
