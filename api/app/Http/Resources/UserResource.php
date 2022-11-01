<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'id_number' => $this->id_number,
          'name' => $this->name,
          'batch' => new BatchResource($this->whenLoaded('batch')),
          'avatar' => new AvatarResource($this->whenLoaded('avatar')),
          'is_verified' => $this->is_verified,
          'email' => $this->email,
          'number' => $this->contact_number
        ];
    }
}
