import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import requests from '../api/requests'

const DocumentView = () => {
    const { id } = useParams();
    let history = useHistory()

    const [documentName, setDocumentName] = useState('')
    const [documentFields, setDocumentFields] = useState([])

    useEffect(() => {
        requests.getDocument(id)
        .then(({data}) => {
            if (!data) {
                throw 'Document with this id was not found!'
            }
            setDocumentName(data.documentName)
            const fields = data.fields
            fields.sort((a,b) => (a.field_seq > b.field_seq) ? 1 : ((b.field_seq > a.field_seq) ? -1 : 0))
            setDocumentFields(fields)
        })
        .catch(e => {
            console.error(e)
            history.push('/')
        })
    }, [])

    const handleChange = (i, e) => {
        let newFormValues = [...documentFields]
        newFormValues[i][e.target.name] = e.target.value
        setDocumentFields(newFormValues)
    }

    const toHomePage = () => {
        history.push('/')
    }

    return (
        <div>
            {documentFields.length > 0 &&
                <div className="card">
                    <div className="px-4 py-2">{documentName}</div>
                    <hr />
                    <div className="card-body">
                        {documentFields.map((field, index) => (
                            <div key={index}>
                                <div className="form-group">
                                    <label className={`${field.is_mandatory ? "required" : ''}`}>{field.field_name}:</label>
                                    {field.field_type === 1 && 
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={field.value}
                                            onChange={e => handleChange(index, e)}
                                        /> 
                                    }
                                    {field.field_type === 2 && 
                                         <select value={field.value} onChange={e => handleChange(index, e)}>
                                            {JSON.parse(field.select_values).map((el, index) => (
                                                <option key={index} value={el.value}>{el.label}</option>
                                            ))}
                                        </select>
                                    }
                                    {field.field_type === 3 && 
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={field.value}
                                            onChange={e => handleChange(index, e)}
                                        /> 
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="btn-back-wrapper">
                        <button
                            className="btn btn-primary"
                            onClick={toHomePage}
                        >
                            Atpakaļ
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export  default DocumentView