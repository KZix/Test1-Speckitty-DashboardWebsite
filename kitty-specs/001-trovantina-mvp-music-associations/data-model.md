# Data Model: Trovantina

## Entities

### User
- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique, Indexed)
- `password`: String (Hashed)
- `role`: Enum ('admin', 'user')
- `created_at`: Timestamp (Indexed)
- `updated_at`: Timestamp

### Instrument
- `id`: UUID (Primary Key)
- `name`: String (Indexed)
- `type`: String (Indexed)
- `brand`: String
- `serial_number`: String (Unique)
- `status`: Enum ('available', 'maintenance', 'assigned') (Indexed)
- `borrower_id`: UUID (Foreign Key to User, nullable, Indexed)
- `image_path`: String (Nullable)
- `created_at`: Timestamp (Indexed for Cursor Pagination)
- `updated_at`: Timestamp

### Attendance
- `id`: UUID (Primary Key)
- `event_id`: String (Reference to Google Calendar Event ID, Indexed)
- `user_id`: UUID (Foreign Key to User, Indexed)
- `status`: Enum ('present', 'absent')
- `marked_by`: UUID (Foreign Key to User - Admin)
- `timestamp`: Timestamp (Indexed)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Relationships
- **User** has many **Attendance** records.
- **User** (Admin) marks many **Attendance** records.
- **User** can be a borrower for many **Instruments**.
- **Instrument** belongs to one **User** (borrower) if assigned.

## Performance Optimizations
- **Indexes**: Added B-tree indexes on `status`, `type`, and `borrower_id` for common filtering.
- **Pagination**: `created_at` and `id` are used as cursors for high-performance infinite scrolling.