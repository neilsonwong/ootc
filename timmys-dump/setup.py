import requests
from requests.auth import HTTPBasicAuth

user = "admin"
pw = "admin"
api_url = "http://localhost:8000"

### TIMESLOT DEFINITIONS FOR 2020 ###

# Hospitality (id=1) TimeSlotDefs
h1 = """ {"repeatStartDate":"2020-01-26",
                        "repeatCount": 10, 
                        "repeatInterval": 2, 
                        "repeatSkipEvery": 0, 
                        "startTime": "15:30", 
                        "duration":150, 
                        "signUpCap":10, 
                        "department":1, 
                        "desc":"Serving Snacks and Socializing"} """

h2 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"18:00", 
                        "duration":210, 
                        "signUpCap":25, 
                        "department":1, 
                        "desc":"Serving Dinner and Socializing"} """


# Kitchen (id=2) TimeSlotDefs
k1 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"15:30", 
                        "duration":240, 
                        "signUpCap":8, 
                        "department":2, 
                        "desc":"Sunday - Food Prep and Cooking"} """
                        
k2 = """ {"repeatStartDate":"2020-01-27", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"5:30", 
                        "duration":180, 
                        "signUpCap":3, 
                        "department":2, 
                        "desc":"Monday - Cooking Breakfast"} """

k3 = """ {"repeatStartDate":"2020-01-23", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"09:00", 
                        "duration":240, 
                        "signUpCap":1, 
                        "department":2, 
                        "desc":"Grocery Shopping"} """


# Registration (id=3) TimeSlotDefs
r1 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"15:30", 
                        "duration":180, 
                        "signUpCap":3, 
                        "department":3, 
                        "desc":"Sunday - Afternoon Sign-in"} """

r2 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"18:30", 
                        "duration":150, 
                        "signUpCap":3, 
                        "department":3, 
                        "desc":"Sunday - Evening Sign-Out"} """

r3 = """ {"repeatStartDate":"2020-01-27", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"06:00", 
                        "duration":120, 
                        "signUpCap":3, 
                        "department":3, 
                        "desc":"Monday - Morning Sign-Out"} """


# Clothing Bank (id=4) TimeSlotDefs
c1 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"15:30", 
                        "duration":150, 
                        "signUpCap":3, 
                        "department":4, 
                        "desc":"Setup and Afternoon Shift"} """

c2 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"17:30", 
                        "duration":120, 
                        "signUpCap":3, 
                        "department":4, 
                        "desc":"Cleanup and Evening Shift"} """


# Setup_Cleanup (id=5) TimeSlotDefs
s1 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"14:00", 
                        "duration":120, 
                        "signUpCap":4, 
                        "department":5, 
                        "desc":"Venue Setup"} """

s2 = """ {"repeatStartDate":"2020-01-26", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"19:30", 
                        "duration":120, 
                        "signUpCap":3, 
                        "department":5, 
                        "desc":"Venue Cleanup"} """

s3 = """ {"repeatStartDate":"2020-01-27", 
                        "repeatCount": 10, 
                        "repeatInterval":2, 
                        "repeatSkipEvery":0, 
                        "startTime":"7:00", 
                        "duration":90, 
                        "signUpCap":5, 
                        "department":5, 
                        "desc":"Monday - Morning Cleanup"} """

data = [h1, h2, k1, k2, k3, r1, r2, r3, c1, c2, s1, s2, s3]

### TIMESLOT DEFINITION END ###


def setup_Departments():

    url = api_url + "/api/v1/admin/departments/add"
    print url

    headers = {'Content-type': 'application/json'}

    data = ['{"departmentName":"Hospitality", "description":"The Hospitality Team focuses on providing a warm and friendly experience to guests.\\nThe team handles serving food, replenishing refreshments, and is highly encouraged to spend time with guests in conversation or activity.\\n\\nTasks include: serving snacks (3:30pm-6pm), serving dinner (6pm-9:30pm), socializing with guests, and other general duties required."}',     # 0
            '{"departmentName":"Kitchen", "description":"The Kitchen Team focuses on preparing and cooking 60+ meals to our guests during the dinner service. The team prepares a unique menu each week consisting of soup, main and dessert.\\n\\nTasks include: grocery shopping, food prep, cooking, dish-washing, and other kitchen duties as required\\n\\nNote: Volunteers are especially needed for Monday morning to prepare breakfast for overnight guests.\\n\\nIMPORTANT: The Kitchen Team is recommended for highly experienced cooks and not beginners. If you sign up for one of these roles, we may contact you to follow up for more information."}',
            '{"departmentName":"Clothing Bank", "description":"The Clothing Bank Team focuses on distributing various clothing items to our guests and organizing new apparel that is purchased or donated. The team aims to assist guest in finding what they need and ensuring that all guests access what they what they need.\\n\\nTasks include: organizing and categorizing apparel, assisting guests in selecting apparel, and other duties as required."}',
            '{"departmentName":"Registration", "description":"The Registration Team focuses on attending to guests and volunteers entering and exiting the premises. The team checks-in guests and coordinates services for the guests such as showers, hair cuts, medical services and social services. \\n\\nTasks include: front desk admin, service coordination, and other duties as required. \\n\\nNote: Volunteers are especially needed for Monday morning during the departure of overnight guests."}',
            '{"departmentName":"Setup and Cleanup", "description":"The Setup/Cleanup Team focuses on setting up and cleaning up the rooms for dining and various services. The team handles setup Sunday afternoon before guests arrive and cleanup on Monday morning after guests depart. \\n\\nTasks include: setting up tables, chairs, and specialized layouts for service rooms.\\n\\nNote: Volunteers are especially needed for Monday morning to cleanup the area."}']   # 4
     
    for i in range(len(data)):
        response = requests.post(url, headers=headers, data=data[i], auth=HTTPBasicAuth(user,pw))
        print(response)

def setup_TimeSlotDefs():

    url = api_url + "/api/v1/admin/schedule/add"
    print url

    headers = {'Content-type': 'application/json'}

    for i in range(len(data)):
        response=requests.post(url, headers=headers, data=data[i], auth=HTTPBasicAuth(user,pw))
        print(response)

def generate():

    url = api_url + "/api/v1/admin/schedule/generate"
    print url

    headers = {'Content-type': 'application/json'}

    for i in range(len(data)):
        response=requests.post(url, headers=headers, data=data[i], auth=HTTPBasicAuth(user,pw))
        print(response)


if __name__ == "__main__":
    
    # 1) Create Departments
    setup_Departments()

    # 2) Create TimeSlotDefs
    setup_TimeSlotDefs()

    # 3) Generate the TimeSlots
    generate()
