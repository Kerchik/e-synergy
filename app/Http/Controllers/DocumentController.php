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
        $request->validate([
            'documentName' => ['required'],
        ]);

        /*
        Were not able to validate each field in $request['formValues'] array. Never had
        simillar task in Laravel. Perhaps if I had more time, I would be able to make normal validation.
        Currently checks only 'documentName' field. Below you can see, how I tried to validate those fields

        foreach ($request['formValues'] as $value) {
            $request->validate([
                'name' => ['required'],
                'number' => ['required'],
                'type' => ['required'],
            ]);
            if (intval($value['type'] === 2)) {
                $request->validate([
                    'select_values' => ['json', 'required']
                ]);
            }
        }
        */

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
                'select_values' => intval($value['type']) === 2 ? $value['select_values'] : null,		
            ]);
            $documentConfiguration->save();
        }
    }
}
