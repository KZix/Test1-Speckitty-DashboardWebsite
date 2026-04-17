<?php

namespace App\Services;

use Google\Client;
use Google\Service\Calendar;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GoogleCalendarService
{
    protected $client;
    protected $calendarId;

    public function __construct()
    {
        $this->calendarId = config('services.google.calendar_id');
        
        $this->client = new Client();
        $this->client->setApplicationName("Trovantina Dashboard");
        $this->client->setScopes([Calendar::CALENDAR_READONLY]);
        
        $authConfig = storage_path('app/google-auth.json');
        
        if (file_exists($authConfig)) {
            $this->client->setAuthConfig($authConfig);
        }
    }

    public function getEvents($forceRefresh = false)
    {
        $cacheKey = 'google_calendar_events';
        
        if ($forceRefresh) {
            Cache::forget($cacheKey);
        }

        return Cache::remember($cacheKey, now()->addMinutes(15), function () {
            try {
                if (!file_exists(storage_path('app/google-auth.json'))) {
                    Log::warning('Google Calendar auth file missing. Returning mock data.');
                    return $this->getMockEvents();
                }

                $service = new Calendar($this->client);
                $optParams = [
                    'maxResults' => 50,
                    'orderBy' => 'startTime',
                    'singleEvents' => true,
                    'timeMin' => date('c'),
                ];
                
                $results = $service->events->listEvents($this->calendarId, $optParams);
                $events = [];

                foreach ($results->getItems() as $event) {
                    $events[] = [
                        'id' => $event->getId(),
                        'title' => $event->getSummary(),
                        'description' => $event->getDescription(),
                        'location' => $event->getLocation(),
                        'start' => $event->getStart()->getDateTime() ?: $event->getStart()->getDate(),
                        'end' => $event->getEnd()->getDateTime() ?: $event->getEnd()->getDate(),
                    ];
                }

                return $events;
            } catch (\Exception $e) {
                Log::error("Google Calendar API Error: " . $e->getMessage());
                return $this->getMockEvents(); // Fallback to mock data on error
            }
        });
    }

    protected function getMockEvents()
    {
        return [
            [
                'id' => 'mock-1',
                'title' => 'String Section Rehearsal',
                'description' => 'Weekly rehearsal for all string players.',
                'location' => 'Main Hall',
                'start' => date('Y-m-d\TH:i:sP', strtotime('next Monday 18:00')),
                'end' => date('Y-m-d\TH:i:sP', strtotime('next Monday 20:00')),
            ],
            [
                'id' => 'mock-2',
                'title' => 'Full Orchestra Practice',
                'description' => 'Preparation for the Spring Concert.',
                'location' => 'Auditorium',
                'start' => date('Y-m-d\TH:i:sP', strtotime('next Wednesday 19:30')),
                'end' => date('Y-m-d\TH:i:sP', strtotime('next Wednesday 22:00')),
            ],
            [
                'id' => 'mock-3',
                'title' => 'Brass & Woodwinds Rehearsal',
                'description' => 'Sectional practice.',
                'location' => 'Room 102',
                'start' => date('Y-m-d\TH:i:sP', strtotime('next Thursday 17:00')),
                'end' => date('Y-m-d\TH:i:sP', strtotime('next Thursday 19:00')),
            ],
            [
                'id' => 'mock-4',
                'title' => 'Annual General Meeting',
                'description' => 'Association updates and voting.',
                'location' => 'Conference Room',
                'start' => date('Y-m-d\TH:i:sP', strtotime('+10 days 10:00')),
                'end' => date('Y-m-d\TH:i:sP', strtotime('+10 days 12:00')),
            ],
        ];
    }
}
