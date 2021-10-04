import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import requests from '../api/requests'

const DocumentTable = () => {
    let history = useHistory()
    const [documentsList, setDocumentsList] = useState([])
    useEffect(() => {
        requests.getAllDocuments()
        .then(({data}) => {
            setDocumentsList(data)
        })
        .catch((e) => {
            console.error(e)
        })
    }, [])

    const toFormPage = () => {
        history.push('/form')
    }
    return (
        <div className="row w-100">
            <div className="w-100 d-flex justify-content-end my-2">
                <button 
                    className="btn btn-success"
                    onClick={toFormPage}
                >
                    Izvediot jaunu dokumentu formu
                </button>
            </div>
            <table className="table table-bordered text-nowrap">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dokumenta nosaukums</th>
                        <th>Izveidošanas datums</th>
                        <th>Dokumenta lielums</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {documentsList.length
                    ?
                    documentsList.map(document => (
                        <tr key={document.id}>
                            <td>{document.id}</td>
                            <td>{document.document_name}</td>
                            <td>{document.created_at}</td>
                            <td>{document.fieldCount}</td>
                            <td><Link to={`/view/${document.id}`}>Atvert</Link></td>
                        </tr>
                    ))
                    :
                        <tr>
                            <td colSpan="4">No documents found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DocumentTable