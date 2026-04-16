<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstrumentResource;
use App\Models\Instrument;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class InstrumentController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request)
    {
        $query = Instrument::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $instruments = $query->orderBy('created_at', 'desc')->cursorPaginate(15);

        return InstrumentResource::collection($instruments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255|unique:instruments',
            'status' => ['sometimes', Rule::in(['available', 'maintenance', 'assigned'])],
            'image' => 'nullable|image|max:2048', // max 2MB
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $this->imageService->uploadInstrumentImage($request->file('image'));
        }

        $instrument = Instrument::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'brand' => $validated['brand'],
            'serial_number' => $validated['serial_number'],
            'status' => $validated['status'] ?? 'available',
            'image_path' => $imagePath,
        ]);

        return new InstrumentResource($instrument);
    }

    public function show(Instrument $instrument)
    {
        return new InstrumentResource($instrument);
    }

    public function update(Request $request, Instrument $instrument)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'brand' => 'sometimes|required|string|max:255',
            'serial_number' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('instruments')->ignore($instrument->id)],
            'status' => ['sometimes', Rule::in(['available', 'maintenance', 'assigned'])],
            'borrower_id' => 'nullable|exists:users,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($instrument->image_path) {
                $this->imageService->deleteImage($instrument->image_path);
            }
            $validated['image_path'] = $this->imageService->uploadInstrumentImage($request->file('image'));
        }

        $instrument->update($validated);

        return new InstrumentResource($instrument);
    }

    public function destroy(Instrument $instrument)
    {
        DB::transaction(function () use ($instrument) {
            if ($instrument->image_path) {
                $this->imageService->deleteImage($instrument->image_path);
            }
            $instrument->delete();
        });

        return response()->json(null, 204);
    }
}
