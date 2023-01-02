<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
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
            'work_place' => $this->work_place,
            'company_name' => $this->company_name,
            'position' => $this->position,
            'work_id_image' => new AvatarResource($this->whenLoaded('iDImage')),
        ];
    }
}
