<?php

namespace Tests\Feature;

use App\Models\Instrument;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InstrumentTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->user = User::factory()->create(['role' => 'user']);
        
        Storage::fake('public');
    }

    public function test_admin_can_create_instrument_with_image()
    {
        $image = UploadedFile::fake()->image('violin.jpg');

        $response = $this->actingAs($this->admin)
            ->postJson('/api/instruments', [
                'name' => 'Stradivarius Copy',
                'type' => 'Violin',
                'brand' => 'Handmade',
                'serial_number' => 'V-12345',
                'image' => $image,
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Stradivarius Copy');

        $this->assertDatabaseHas('instruments', [
            'serial_number' => 'V-12345',
        ]);

        $instrument = Instrument::first();
        Storage::disk('public')->assertExists($instrument->image_path);
    }

    public function test_non_admin_cannot_create_instrument()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/instruments', [
                'name' => 'Unauthorized Instrument',
                'type' => 'Flute',
                'brand' => 'Yamaha',
                'serial_number' => 'F-999',
            ]);

        $response->assertStatus(403);
    }

    public function test_user_can_list_instruments()
    {
        Instrument::factory()->count(20)->create();

        $response = $this->actingAs($this->user)
            ->getJson('/api/instruments');

        $response->assertStatus(200)
            ->assertJsonCount(15, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'type', 'brand', 'serial_number', 'status', 'image_url']
                ],
                'links',
                'meta'
            ]);
    }

    public function test_admin_can_update_instrument()
    {
        $instrument = Instrument::factory()->create(['name' => 'Old Name']);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/instruments/{$instrument->id}", [
                'name' => 'New Name',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'New Name');

        $this->assertDatabaseHas('instruments', [
            'id' => $instrument->id,
            'name' => 'New Name',
        ]);
    }

    public function test_admin_can_delete_instrument()
    {
        $instrument = Instrument::factory()->create();
        $imagePath = 'instruments/test.jpg';
        Storage::disk('public')->put($imagePath, 'fake content');
        $instrument->update(['image_path' => $imagePath]);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/instruments/{$instrument->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('instruments', ['id' => $instrument->id]);
        Storage::disk('public')->assertMissing($imagePath);
    }

    public function test_validation_prevents_duplicate_serial_number()
    {
        Instrument::factory()->create(['serial_number' => 'DUP-123']);

        $response = $this->actingAs($this->admin)
            ->postJson('/api/instruments', [
                'name' => 'Test',
                'type' => 'Test',
                'brand' => 'Test',
                'serial_number' => 'DUP-123',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['serial_number']);
    }
}
