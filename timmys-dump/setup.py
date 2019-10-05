import requests
from requests.auth import HTTPBasicAuth

# THESE ARE LEGIT
# assume db is empty

hostname = "localhost:8000"

session = requests.Session()

user = "neilson@ootc.tccc.ca"
pw = "asdfasdf"

def setup_Departments():

    url = "http://localhost:8000/api/v1/admin/departments/add"

    headers = {'Content-type': 'application/json'}

    data = ['{"department":"Hospitality"}',     # 0
            '{"department":"Kitchen"}',
            '{"department":"Registration"}',
            '{"department":"Clothing Bank"}',
            '{"department":"Setup and Cleanup"}']   # 4
     
    for i in range(len(data)):
        response = requests.post(url, headers=headers, data=data[i], auth=HTTPBasicAuth(user,pw))
        print(response)

def setup_TimeSlotDefs():

    url = "http://localhost:8000/api/v1/admin/schedule/add"

    headers = {'Content-type': 'application/json'}

    # Need to do Time, Duration, Cap, Desc
    # Interval = 2 (WEEKLY)

    # Hospitality (id=1) TimeSlotDefs
    h1 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26",
                            "repeatCount": 10, 
                            "repeatInterval": 2, 
                            "repeatSkipEvery": 0, 
                            "startTime": "15:30", 
                            "duration":150, 
                            "signUpCap":10, 
                            "department":1, 
                            "desc":"Serving Snacks and Socializing with Guests"}} """

    h2 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"18:00", 
                            "duration":210, 
                            "signUpCap":25, 
                            "department":1, 
                            "desc":"Serving Dinner and Socializing with Guests"}} """


    # Kitchen (id=2) TimeSlotDefs
    k1 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"15:30", 
                            "duration":240, 
                            "signUpCap":8, 
                            "department":2, 
                            "desc":"Food Preparation and Cooking"}} """
                            
    k2 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-27", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"5:30", 
                            "duration":180, 
                            "signUpCap":3, 
                            "department":2, 
                            "desc":"Monday Morning - Cooking Breakfast"}} """

    k3 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-23", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"09:00", 
                            "duration":240, 
                            "signUpCap":1, 
                            "department":2, 
                            "desc":"Grocery Shopping"}} """


    # Registration (id=3) TimeSlotDefs
    r1 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"15:30", 
                            "duration":180, 
                            "signUpCap":3, 
                            "department":3, 
                            "desc":"Sunday Afternoon - Guest Sign-in"}} """

    r2 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"18:30", 
                            "duration":150, 
                            "signUpCap":3, 
                            "department":3, 
                            "desc":"Sunday Evening - Dinner-Only Sign-Out"}} """

    r3 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-27", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"06:00", 
                            "duration":120, 
                            "signUpCap":3, 
                            "department":3, 
                            "desc":"Monday Morning - Overnight Sign-out"}} """


    # Clothing Bank (id=4) TimeSlotDefs
    c1 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"15:30", 
                            "duration":150, 
                            "signUpCap":3, 
                            "department":4, 
                            "desc":"Setup and Afternoon Shift"}} """

    c2 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"17:30", 
                            "duration":120, 
                            "signUpCap":3, 
                            "department":4, 
                            "desc":"Cleanup and Evening Shift"}} """


    # Setup_Cleanup (id=5) TimeSlotDefs
    s1 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"14:00", 
                            "duration":120, 
                            "signUpCap":4, 
                            "department":5, 
                            "desc":"Afternoon Setup"}} """

    s2 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-26", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"19:30", 
                            "duration":120, 
                            "signUpCap":3, 
                            "department":5, 
                            "desc":"Evening Cleanup"}} """

    s3 = """ {"timeSlotDef":{"repeatStartDate":"2020-01-27", 
                            "repeatCount": 10, 
                            "repeatInterval":2, 
                            "repeatSkipEvery":0, 
                            "startTime":"7:00", 
                            "duration":90, 
                            "signUpCap":5, 
                            "department":5, 
                            "desc":"Monday Morning Cleanup"}} """

    data = [h1,h2, k1, k2, k3, r1, r2, r3, c1, c2, s1, s2, s3]

    for i in range(len(data)):
        response=requests.post(url, headers=headers, data=data[i])
        print(response)

if __name__ == "__main__":
    
    # 1) Create Departments
    setup_Departments()

    # 2) Create TimeSlotDefs
    #setup_TimeSlotDefs()