<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentConfiguration extends Model
{
    protected $table = 'document_configuration';

    protected $fillable = ['field_seq', 'is_mandatory', 'field_type', 'field_name', 'document_id'];

    public $timestamps = false;
}
