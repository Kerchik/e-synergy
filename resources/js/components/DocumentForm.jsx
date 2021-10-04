import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import requests from '../api/requests'

const DocumentForm = () => {
    let history = useHistory()
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
        for (let i=0; i<formValues.length; i++) {
            // Had no time for better validation
            if (!formValues[i].name || !formValues[i].type || !formValues[i].number) {
                console.error('Please fill all fields')
                return
            } else if (formValues[i].type === '2' && !formValues[i].select_values) {
                console.error('select_values is empty')
                return
            } else if (formValues[i].type === '2' && !isJsonString(formValues[i].select_values)) {
                console.error('Invalid JSON is select_values field')
                return
            } else if (formValues[i].type === '2' && isJsonString(formValues[i].select_values)) {
                //formValues[i].select_values = JSON.stringify(formValues[i].select_values)
            }
        }
        requests.createDocument({'documentName': documentName, 'formValues': {...formValues}})
        .then((response) => {
            history.push('/')
        })
        .catch(e => {
            console.log(e)
        })
    }

    const isJsonString = (str) =>  {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    return (
        <form onSubmit={submit}>
            <div className="form-group">
                <label>Document name:</label>
                <input
                    type="text"
                    name="document-name"
                    required
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
                            required
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
                            required
                            className="form-control"
                            value={el.name}
                            onChange={e => handleChange(index, e)}
                        />
                    </div>
                    { el.type === "2" &&
                        <div className="form-group">
                            <label>Select vertības:</label>
                            <input
                                type="text"
                                name="select_values"
                                className="form-control"
                                value={el.select_values}
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
            <hr/>
            <button 
                type="button"
                className="btn btn-primary"
                onClick={addFormFields}
            >
                Pievienot vel
            </button>
            <hr/>
            <button 
                type="button"
                className="btn btn-success w-100"
                onClick={submit}
            >
                Submit
            </button>
        </form>
    )
}

export default DocumentForm