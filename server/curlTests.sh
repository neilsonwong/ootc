# register user
curl -X POST -H "Content-Type: application/json" \
 -d '{"user":{"email":"neilson@ootc.tccc.ca","fname":"neilson","mname":"hiuchung","lname":"wong","phone":"6471234567","age":28,"experience":"iamhallo.iamhallo.iamhallo.iamhallo.iamhallo.iamhallo.iamhallo.iamhallo.","comments":"yyyyyes,yesyesyesyeses,yesyesyesyeses,yesyesyesyeses,yesyesyesyeses,yesyesyesyes"},"password":"asdfasdf"}' \
 http://localhost:8000/api/v1/register

# validate email
curl -X POST -H "Content-Type: application/json" \
 -d '{"userId":"neilson@ootc.tccc.ca","validationCode":111111}' \
 http://localhost:8000/api/v1/validateEmail

# login
curl -X POST -H "Content-Type: application/json" \
 -d '{"userId":"neilson@ootc.tccc.ca","password":"asdfasdf"}' \
 http://localhost:8000/api/v1/login

#######################################################
#
# ADMIN MAKE TIMESLOTS
#
#######################################################

# make time slot
curl -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/schedule

 curl -X POST -H "Content-Type: application/json" \
 -d '{"department":"hospitality"}' \
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/departments/add

 curl -X POST -H "Content-Type: application/json" \
 -d '{"department":"kitchen"}' \
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/departments/add

 curl -X POST -H "Content-Type: application/json" \
 -d '{"department":"clothing"}' \
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/departments/add

curl -X POST -H "Content-Type: application/json" \
 -d '{"timeSlotDef":{"repeatStartDate":"2019-09-19", "repeatCount": 1, "repeatInterval":0, "repeatSkipEvery":0, "startTime":"16:00", "duration":240, "signUpCap":0, "department":0, "desc":"thisisatest2"}}' \
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/schedule/add

curl -X POST -H "Content-Type: application/json" \
-d '{"timeSlotDef":{"repeatStartDate":"2020-01-31", "repeatCount": 3, "repeatInterval":3, "repeatSkipEvery":1, "startTime":"16:00", "duration":240, "signUpCap":0, "department":1, "desc":"thisisatest2"}}' \
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/schedule/add

curl -X POST -H "Content-Type: application/json" \
-d '{"timeSlotDef":{"repeatStartDate":"2019-09-19", "repeatCount": 1, "repeatInterval":2, "repeatSkipEvery":0, "startTime":"14:00", "duration":360, "signUpCap":30, "department":2, "desc":"thisisatest3"}}' \
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/schedule/add

curl -X POST -H "Content-Type: application/json" \
-d '{"timeSlotDef":{"repeatStartDate":"2019-09-19", "repeatCount": 1, "repeatInterval":1, "repeatSkipEvery":2, "startTime":"13:00", "duration":120, "signUpCap":20, "department":3, "desc":"thisisatest4"}}' \
-u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/schedule/add

curl -X POST -H "Content-Type: application/json" \
-d '{"timeSlotDef":{"id":12,"startTime":"14:00","duration":360,"department":2,"signUpCap":30,"desc":"thisisatest3","repeatStartDate":"2019-09-19","repeatCount":1,"repeatInterval":2,"repeatSkipEvery":0}}' \
-u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1/admin/schedule/generate
