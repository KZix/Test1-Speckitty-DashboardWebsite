# Specification: Trovantina MVP for Music Associations

## 1. Overview
Trovantina is an inventory and association management system designed for juvenile music associations. It provides a landing page for the public and a secure dashboard for members and administrators to manage instruments, track attendance, and view schedules.

## 2. User Scenarios & Testing
### 2.1 Administrator Flow: Instrument Management
- **Given** an Administrator is logged in
- **When** they navigate to the Inventory module
- **Then** they can add a new instrument with its details (Type, Brand, Serial Number, Name, Image)
- **And** they can mark the instrument as "In Maintenance" or assign it to a member for training purposes.

### 2.2 Member Flow: Schedule Viewing
- **Given** a Member is logged in
- **When** they navigate to the Dashboard
- **Then** they see a read-only view of the central association Google Calendar (rehearsals, concerts, etc.).

### 2.3 Administrator Flow: Attendance Tracking
- **Given** an event (rehearsal/concert) is scheduled
- **When** the Administrator opens the Attendance module
- **Then** they can mark specific members as present or absent for that event.

## 3. Functional Requirements
### 3.1 Authentication & Authorization
- **FR-AUTH-01**: Secure registration and login system.
- **FR-AUTH-02**: Role-based access control for "Administrator" and "Normal User".

### 3.2 Landing Page
- **FR-LAND-01**: Publicly accessible page with "About Us" section.
- **FR-LAND-02**: Navigation links to Login and Register.

### 3.3 Dashboard (Private)
- **FR-DASH-01**: Secure area accessible only to authenticated users.
- **FR-DASH-02**: Modular layout hosting Inventory, Calendar, and Attendance.

### 3.4 Instrument Inventory
- **FR-INV-01**: CRUD operations for instruments (Admins only).
- **FR-INV-02**: Track: Type, Brand, Serial Number, Name, Maintenance Status, Assignment, and Image.
- **FR-INV-03**: Members can view the inventory but not modify it.

### 3.5 Google Calendar Integration
- **FR-CAL-01**: Display a central Google Calendar account's events.
- **FR-CAL-02**: Events include rehearsals and concerts.
- **FR-CAL-03**: Read-only access for members.

### 3.6 Attendance Tracking
- **FR-ATT-01**: Admins can mark attendance for events.
- **FR-ATT-02**: Tracking for rehearsals and concerts.

## 4. Success Criteria (Measurable)
- **SC-01**: 100% of core authentication and inventory logic covered by backend tests.
- **SC-02**: Dashboard modules load via lazy loading to optimize performance.
- **SC-03**: API responses for Inventory and Attendance modules follow a strict JSON contract.
- **SC-04**: Landing page achieves a high performance score (>90) on standard web audit tools.

## 5. Assumptions
- The association will provide a single Google account for the shared calendar.
- Images for instruments will be stored on a local filesystem or cloud storage (e.g., S3).
- PostgreSQL will be used as the persistent data store.

## 6. Key Entities
- **User**: Name, Email, Role (Admin/User), Password.
- **Instrument**: Name, Type, Brand, Serial Number, Status (Maintenance/Available/Assigned), Borrower ID, Image Path.
- **Attendance**: Event ID, User ID, Status (Present/Absent), Timestamp.
- **Event**: (Derived from Google Calendar) Title, Start Time, End Time, Type.