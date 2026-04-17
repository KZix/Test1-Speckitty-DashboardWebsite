<?php

namespace App\Http\Controllers;

use App\Services\GoogleCalendarService;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    protected $calendarService;

    public function __construct(GoogleCalendarService $calendarService)
    {
        $this->calendarService = $calendarService;
    }

    public function index(Request $request)
    {
        $forceRefresh = $request->has('refresh') && $request->user() && $request->user()->role === 'admin';
        
        $events = $this->calendarService->getEvents($forceRefresh);
        
        return response()->json($events);
    }
}
