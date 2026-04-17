import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/getEvents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CalendarView() {
  const { data: events, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: getEvents,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive bg-destructive/10">
        <CardContent className="pt-6">
          <p className="text-destructive font-medium">Failed to load calendar events.</p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Association Calendar</h2>
          <p className="text-muted-foreground">Upcoming rehearsals, concerts, and events.</p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => refetch()} 
          disabled={isRefetching}
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {new Date(event.start).toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(event.start).toLocaleTimeString(undefined, { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} 
                    {' - '}
                    {new Date(event.end).toLocaleTimeString(undefined, { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {event.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 pt-2 border-t">
                    {event.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full h-32 flex flex-col items-center justify-center bg-muted/20 border border-dashed rounded-lg">
            <CalendarIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No upcoming events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Loader2 } from 'lucide-react';
