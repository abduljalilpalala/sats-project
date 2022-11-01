<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
  public function index()
  {
    return PostResource::collection(Post::orderByDesc('created_at')->get());
  }

  public function store(PostRequest $request)
  {
    $post = Post::create($request->validated());
    return response()->json($post);
  }

  public function update(PostRequest $request, Post $post)
  {
    $post->update($request->validated());
    return response()->json($post);
  }

  public function destroy(Post $post)
  {
    $post->deleteOrFail();
    return response()->json($post);
  }
}
