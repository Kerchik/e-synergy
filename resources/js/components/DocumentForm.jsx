import React, {useState, useEffect} from 'react'
import requests from '../api/requests'

const DocumentForm = () => {
    const [documentName, setDocumentName] = useState('')
    const [formValues, setFormValues] = useState(
        [
            {
                number: "",
                type: "",
                name: "",
                select_values: "",
                required: false
            }
        ]
    )

    const handleChange = (i, e) => {
        let newFormValues = [...formValues]
        newFormValues[i][e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormValues(newFormValues)
    }
    
    const addFormFields = () => {
        setFormValues(
            [
                ...formValues,
                {
                    number: "",
                    type: "",
                    name: "",
                    select_values: "",
                    required: false
                }
            ]
        )
    }

    const submit = (e) => {
        e.preventDefault();
        requests.createDocument({'documentName': documentName, 'formValues': {...formValues}})
        .then((response) => {
            console.log(response)
        })
        .catch(e => {
            console.log(e)
        })
    }
    return (
        <form onSubmit={submit}>
            <div className="form-group">
                <label>Document name:</label>
                <input
                    type="text"
                    name="document-name"
                    className="form-control"
                    value={documentName}
                    onChange={e => setDocumentName(e.target.value)}
                />
            </div>
            {formValues.map((el, index) => (
                <div key={index}>
                    <div className="form-group">
                        <label>Secība:</label>
                        <input
                            type="number"
                            name="number"
                            className="form-control"
                            value={el.number}
                            onChange={e => handleChange(index, e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Lauka tips:</label>
                        <select name="type" value={el.type} onChange={e => handleChange(index, e)}>
                            <option disabled value=''>Choose</option>
                            <option value="1">Input</option>
                            <option value="2">Select</option>
                            <option value="3">NumberInput</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Lauka nosaukums:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={el.name || ""}
                            onChange={e => handleChange(index, e)}
                        />
                    </div>
                    { el.type === "2" &&
                        <div className="form-group">
                            <label>Lauka nosaukums:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={el.name || ""}
                                onChange={e => handleChange(index, e)}
                            />
                        </div>
                    }
                    <div className="form-group">
                        <label>Obligats:</label>
                        <input
                            type="checkbox"
                            name="required"
                            className="form-control"
                            value={el.required}
                            onChange={e => handleChange(index, e)}
                        />
                    </div>
                </div>
            ))}
            <button 
                type="button"
                className="btn btn-primary"
                onClick={addFormFields}
            >
                Pievienot vel
            </button>
            <button 
                type="button"
                className="btn btn-success"
                onClick={submit}
            >
                Submit
            </button>
        </form>
    )
}

export default DocumentForm