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

# get reservation

curl -X POST -H 
 -u neilson@ootc.tccc.ca:asdfasdf \
 http://localhost:8000/api/v1