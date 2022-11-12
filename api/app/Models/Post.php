<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	use HasFactory;

	protected $guarded = [];

	public function createPost($request)
	{
		return Post::create($request->validated());
	}

	public function updatePost($request)
	{
		$this->update($request->validated());
		return response()->json($this);
	}

	public function deletePost()
	{
		$this->deleteOrFail();
		return response()->json($this);
	}
}
