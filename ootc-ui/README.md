# OOTC-UI Application Architecture

## Main Pages
* Landing Page
* Registration Page
* About Page
* Email Validation Page
* user Sign Up Page
* user Reservations
* admin user management
* admin schedule creation
* admin schedule management
* admin attendance page

## Module Breakdown
### Home Module (home)
* Pages
	* Landing Page (also handles login)
		* shared/headerBarComponent
		* shared/footerBarComponent
		* auth/loginFormComponent
	* About Page
		* shared/headerBarComponent
		* shared/footerBarComponent
	* Registration Page
		* shared/headerBarComponent
		* shared/footerBarComponent
		* auth/registrationFormComponent
	* Email Validation Page
		* shared/headerBarComponent
		* shared/footerBarComponent

### Authentication Module (auth)
* Components
	* loginFormComponent
	* registrationFormComponent

### Reservation Module
* Pages
	* Reservation Sign Up Page
		* shared/headerBarComponent
		* shared/footerBarComponent
		* upcomingReservationsListComponent (at a glance)
		* departmentSpotlightComponent
		* reservationSignUpFormComponent
	* Reservation Management Page
		* shared/headerBarComponent
		* shared/footerBarComponent
		* reservationDetailsComponent
* Components
	* upcomingReservationsListComponent
	* reservationSignUpFormComponent
	* reservationDetailsComponent
	* departmentSpotlightComponent

### Admin Module
* Pages 
	* User Management Page
		* shared/headerBarComponent
		* shared/footerBarComponent
		* userListComponent
	* Schedule Creation Page (define time slot defs)
		* shared/headerBarComponent
		* shared/footerBarComponent
		* addTimeSlotDefComponent
		* timeSlotDefDetailsComponent
	* Schedule Management Page (define time slots)
		* shared/headerBarComponent
		* shared/footerBarComponent
		* shared/confirmationModal
		* timeSlotDetailComponent
	* Attendance page
		* shared/headerBarComponent
		* shared/footerBarComponent
* Components
	* userListComponent
	* addTimeSlotDefComponent
	* timeSlotDefDetailsComponent
	* timeSlotDetailComponent
	* reservationDetailComponent

### Shared Module (shared)
* headerBar
* footerBar
* confirmationModal

## Services
### AuthenticationService
* getSecurityClearance(): number
	> gets the authorization context of the current user
	> 0: not logged in
	> 1: logged in as user
	> 2: logged in as admin
	> Note this is mainly used for ui intelligence AKA what links to show in header
* login(username, password): Observable<boolean>
	> attempts to log the user in
	> if the attempt is successful, the http basic interceptor will be setup
* logout(): void
	> removes the user credentials
* validateEmail(validationCode): Observable<boolean>
	> sends a POST request to the server to validate the user email
* resendValidationEmail(): Observable<boolean>
	> sends a POST request to the server to resend a new validation code to the email

### UserService
* registerUser(user): Observable<User>
	> send a POST request to the server to create the new user and setup their account
* changePasswordRequest(userId): Observable<boolean>
	> send a POST request to the server to send a password reset email
* changePassword(newPassword): Observable<boolean>
	> send a POST request to the server to change the password
* getAllUsers(): Observable<User[]>
	> gets a list of all users
* updateUser(user): Observable<User>
	> updates a user

### ReservationService
* getReservations(): Observable<Reservation[]>
	> get a list of all reservations
* addReservation(reservation): Observable<Reservation>
	> add a reservation
* deleteReservation(reservationId): Observable<boolean>
	> add a reservation
* getReservationsForUser(userId): Observable<Reservation[]>
	> get a list of all reservations for a particular user
* addReservationForUser(reservation): Observable<Reservation>
	> admin version of addReservation
* reservationSignin(userId): Observable<boolean>
	> reg desk signin

### ScheduleService
* getSchedule(): Observable<TimeSlotDef[]>
	> gets the list of time slot defs
* addScheduleItem(timeSlotDef): Observable<TimeSlot>
	> add a time slot def
* removeScheduleItem(timeSlotDefId): Observable<TimeSlot>
	> remove a time slot def	
* updateScheduleItem(timeSlotDef): Observable<TimeSlotDef>
	> update a time slot def
* generateSchedule(timeSlotDef): Observable<Reservation[]>???? * not sure about this one
	> generate timeSlots based on a timeSlotDef
* getTimeSlots(): Observable<TimeSlot[]>
	> get all time slots
* getAvailableTimeSlots(): Observable<TimeSlot[]>
	> get a list of available time slots

### DepartmentService
* getDepartments(): Observable<Department[]>
	> get all Departments
* addDepartment(departmentName): Observable<Department>
	> add a new department
* updateDepartment(department): Observable<Department>
	> update a department (just name for now)

## AuthGuard
> we can add an auth guard which will handle which routes are permitted

TODO:
fix footer positioning overlaps
