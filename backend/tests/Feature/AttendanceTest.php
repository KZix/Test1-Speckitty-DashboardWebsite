<?php

namespace Tests\Feature;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->user = User::factory()->create(['role' => 'user']);
    }

    public function test_admin_can_mark_attendance()
    {
        $targetUser = User::factory()->create();
        $eventId = 'google-event-123';

        $response = $this->actingAs($this->admin)
            ->postJson('/api/attendance', [
                'event_id' => $eventId,
                'attendances' => [
                    [
                        'user_id' => $targetUser->id,
                        'status' => 'present',
                    ]
                ],
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('attendances', [
            'event_id' => $eventId,
            'user_id' => $targetUser->id,
            'status' => 'present',
            'marked_by' => $this->admin->id,
        ]);
    }

    public function test_non_admin_cannot_mark_attendance()
    {
        $targetUser = User::factory()->create();
        $eventId = 'google-event-123';

        $response = $this->actingAs($this->user)
            ->postJson('/api/attendance', [
                'event_id' => $eventId,
                'attendances' => [
                    [
                        'user_id' => $targetUser->id,
                        'status' => 'present',
                    ]
                ],
            ]);

        $response->assertStatus(403);
    }

    public function test_user_can_get_attendance_for_event()
    {
        $targetUser = User::factory()->create();
        $eventId = 'google-event-123';

        Attendance::create([
            'event_id' => $eventId,
            'user_id' => $targetUser->id,
            'status' => 'present',
            'marked_by' => $this->admin->id,
            'timestamp' => now(),
        ]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/attendance?event_id={$eventId}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'user_id' => $targetUser->id,
                'status' => 'present',
            ]);
    }
}
