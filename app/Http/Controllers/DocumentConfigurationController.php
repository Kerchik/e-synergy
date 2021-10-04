<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DocumentConfiguration;
use App\Models\Document;

class DocumentConfigurationController extends Controller
{
    public function getDocument($id) {
        $document = Document::where('id', $id)->first();
        $documentInfo = DocumentConfiguration::where('document_id', $id)->get();
        $response['documentName'] = $document['document_name'];
        $response['fields'] = $documentInfo;
        return $response;
    }
}
