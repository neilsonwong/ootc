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
* getAuthContext()
	> gets the authorization context of the current user
	> 0: not logged in
	> 1: logged in as user
	> 2: logged in as admin
	> Note this is mainly used for ui intelligence AKA what links to show in header
* login(username, password)
	> attempts to log the user in
	> if the attempt is successful, the http basic interceptor will be setup
* logout()
	> removes the user credentials
* validateEmail(validationCode)
	> sends the validation code to the server to validate the user email
* resendValidationEmail()
	> sends a request to the server to resend a new validation code to the email

### UserService
* registerUser(user)
	> send a request to the server to create the new user and setup their account
* changePasswordRequest(userId)
	> send a request to the server to send a password reset email
* changePassword(newPassword)
	> send a request to the server to change the password
* getAllUsers()
	> gets a list of all users
* updateUser(user)
	> updates a user

### ReservationService
* getReservations()
	> get a list of all reservations
* addReservation(reservation)
	> add a reservation
* deleteReservation(reservationId)
	> add a reservation
* getReservationsForUser(userId)
	> get a list of all reservations for a particular user
* addReservationForUser(reservation)
	> admin version of addReservation
* reservationSignin(userId)
	> reg desk signin

### ScheduleService
* getSchedule()
	> gets the list of time slot defs
* addScheduleItem(timeSlotDef)
	> add a time slot def
* removeScheduleItem(timeSlotDefId)
	> remove a time slot def	
* updateScheduleItem(timeSlotDef)
	> update a time slot def
* generateSchedule(timeSlotDef)
	> generate timeSlots based on a timeSlotDef
* getTimeSlots()
	> get all time slots
* getAvailableTimeSlots()
	> get a list of available time slots

### DepartmentService
* getDepartments()
	> get all Departments
* addDepartment(departmentName)
	> add a new department
* updateDepartment(department)
	> update a department (just name for now)

## AuthGuard
> we can add an auth guard which will handle which routes are permitted