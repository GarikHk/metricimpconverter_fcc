import React, { useState } from 'react';

export default function App() {
    const [formData, setFormData] = useState({ input: "" })
    const [result, setResult] = useState("");
    const [jsonResult, setJsonResult] = useState("");

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
                setResult(data.string || data);
                setJsonResult(JSON.stringify(data));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <header>
                <h1>Metric/Imperial Converter</h1>
            </header>

            <section>
                <h3>Example usage</h3>
                <code>/api/convert?input=4gal</code><br />
                <code>/api/convert?input=1/2km</code><br />
                <code>/api/convert?input=5.4/3lbs</code><br />
                <code>/api/convert?input=kg</code><br />
                <h3>Example return</h3>
                <code>{'{ initNum: 3.1, initUnit: \'mi\', returnNum: 4.98895, returnUnit: \'km\', string: \'3.1 miles converts to 4.98895 kilometers\' }'}</code>
            </section>

            <section>
                <div id="testui">
                    <h3 style={{ textAlign: 'left' }}>Front-End</h3>
                    <form id="convertForm" className="border" onSubmit={handleSubmit}>
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
                    <p id="result">{result}</p>
                    <code id="jsonResult">{jsonResult}</code>
                </div>
            </section>

        </div>
    );
};
