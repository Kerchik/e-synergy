<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\DocumentConfiguration;
use Carbon\Carbon;

class DocumentController extends Controller
{
    public function index() {
        $documents = Document::orderBy('id', 'ASC')->get();
        foreach ($documents as $document) {
            $fieldCount = count(DocumentConfiguration::where('document_id', $document->id)->get());
            $document['fieldCount'] = $fieldCount;
        }
        return $documents;
    }

    public function create(Request $request) {
        $document = new Document([
			'document_name' => $request['documentName'],		
			'created_at' => now(),
		]);
        $document->save();
        foreach ($request['formValues'] as $value) {
            $documentConfiguration = new DocumentConfiguration([
                'field_seq' => intval($value['number']),		
                'is_mandatory' => $value['required'],		
                'field_type' => intval($value['type']),		
                'field_name' => $value['name'],		
                'document_id' => $document->id,		
            ]);
            $documentConfiguration->save();
        }
    }
}
