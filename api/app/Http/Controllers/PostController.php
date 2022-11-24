<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(Post::latest()->get());
    }

    public function store(PostRequest $request)
    {
        $post = new Post();
        return $post->createPost($request);
    }

    public function update(PostRequest $request, Post $post)
    {
        return $post->updatePost($request);
    }

    public function destroy(Post $post)
    {
        return $post->deletePost();
    }
}
