<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'event_id' => 'required|string',
        ]);

        $eventId = $request->event_id;

        // Get all users and their attendance for this event
        $users = User::orderBy('name')->get()->map(function ($user) use ($eventId) {
            $attendance = Attendance::where('event_id', $eventId)
                ->where('user_id', $user->id)
                ->first();

            return [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'status' => $attendance ? $attendance->status : null,
                'updated_at' => $attendance ? $attendance->updated_at : null,
            ];
        });

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|string',
            'attendances' => 'required|array',
            'attendances.*.user_id' => 'required|exists:users,id',
            'attendances.*.status' => ['required', Rule::in(['present', 'absent'])],
        ]);

        $eventId = $request->event_id;
        $markedBy = $request->user()->id;
        $timestamp = now();

        DB::transaction(function () use ($request, $eventId, $markedBy, $timestamp) {
            foreach ($request->attendances as $item) {
                Attendance::updateOrCreate(
                    [
                        'event_id' => $eventId,
                        'user_id' => $item['user_id'],
                    ],
                    [
                        'status' => $item['status'],
                        'marked_by' => $markedBy,
                        'timestamp' => $timestamp,
                    ]
                );
            }
        });

        return response()->json(['message' => 'Attendance updated successfully.']);
    }
}
