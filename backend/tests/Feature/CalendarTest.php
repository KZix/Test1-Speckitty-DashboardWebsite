<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\GoogleCalendarService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalendarTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_authenticated_user_can_fetch_calendar_events()
    {
        $mockService = \Mockery::mock(GoogleCalendarService::class);
        $mockService->shouldReceive('getEvents')
            ->once()
            ->andReturn([
                [
                    'id' => 'test-1',
                    'title' => 'Test Event',
                    'start' => now()->toIso8601String(),
                    'end' => now()->addHour()->toIso8601String(),
                ]
            ]);
        
        $this->app->instance(GoogleCalendarService::class, $mockService);

        $response = $this->actingAs($this->user)
            ->getJson('/api/calendar/events');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonPath('0.title', 'Test Event');
    }

    public function test_unauthenticated_user_cannot_fetch_calendar_events()
    {
        $response = $this->getJson('/api/calendar/events');

        $response->assertStatus(401);
    }
}
