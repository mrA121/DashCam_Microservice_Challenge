# DashCam Application
#### Dashboard Camera or sometimes simply referred as Dashcam application supports features like:-
1. Send location to server
2. Send an alarm to server
3. Get all the alarms for a device
4. Send video clips related to an alarm
5. Send a Reboot and Configure IP:PORT command
6. Generate a login token for a device

#### To get the best possible atomic structure for our DashCam backend it is divided into three independently deployable modules:-
1. Alarms:- which handles location and alarms related calls
2. Command:- which takes command related calls, also generate login token for the device
3. Videos:- which takes calls related to uploading video or downloading videos

#### Tools and Technologies Used:-
1. Nginx- API Gateway to act as reverse proxy engine and route requests to individual microservices
2. MongoDB- Backed Database 
3. Web Framework- Express.JS
4. Authenctication Mechanism:- Json Web Tokenization


#### Ideally our services should have seperate databases but for the sake of simplicity we have got only one backend server.

## API End Points


### Get Token

#### Request:
```
POST /api/command/get_token/v1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
{
    "type": "LOGIN",
    "imei": "12345678" 
}
```

#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NjExMDEsImV4cCI6MTYwMDc2NDcwMX0.k_xA7rlkOQve1DkvgbLh13zWO1jqGnR048RI_o2dtMc"
}
```

#### Failed Response
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "IMEI invalid"
}
```



### DashCam Command 

#### Request:
```
POST /api/command/v1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
{
    "type": "COMMAND",
    "imei": 12345678,
    "command": "some_command_string"
}
```

#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "type": 'COMMAND_RESPONSE',
    "response": 'Failure'
}
```

### Post Location

#### Request:
```
POST /api/location/v1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NjExMDEsImV4cCI6MTYwMDc2NDcwMX0.k_xA7rlkOQve1DkvgbLh13zWO1jqGnR048RI_o2dtMc

Content-Length: xy
{
    "type": "LOCATION",
    "location_time": "2020-08-18T16:45:35Z",
    "latitude": 32.378903,
    "longitude": -122.457324
}
```
#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Location saved successfully!",
    "location": {
        "_id": "5f69b4da115f1b0013c5640f",
        "imei": 12345678,
        "location_time": "2020-08-18T16:45:35.000Z",
        "latitude": 32.378903,
        "longitude": -122.457324,
        "__v": 0
    }
}
```

#### Failed Response
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "invalid token"
}

or 

HTTP/1.1 422 Unprocessable Entity
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Not a Valid Location Request."
}
```

### Get Location

#### Request:
```
GET /api/location/v1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NjExMDEsImV4cCI6MTYwMDc2NDcwMX0.k_xA7rlkOQve1DkvgbLh13zWO1jqGnR048RI_o2dtMc
```
#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Fetched locations successfully.",
    "locations": [
        {
            "_id": "5f69b4da115f1b0013c5640f",
            "imei": 12345678,
            "location_time": "2020-08-18T16:45:35.000Z",
            "latitude": 32.378903,
            "longitude": -122.457324,
            "__v": 0
        },
        {
            "_id": "5f69b9f7115f1b0013c56410",
            "imei": 12345678,
            "location_time": "2020-08-18T16:45:35.000Z",
            "latitude": 32.378903,
            "longitude": -122.457324,
            "__v": 0
        }
    ],
    "count": 2
}
```
#### Failed Response:
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "invalid token"
}
```
### Post Alarm

#### Request:
```
POST /api/alarm/v1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NjExMDEsImV4cCI6MTYwMDc2NDcwMX0.k_xA7rlkOQve1DkvgbLh13zWO1jqGnR048RI_o2dtMc

Content-Length: xy
{
    "type": "ALARM",
    "alarm_type": "CRASH",
    "alarm_time": "2020-08-18T16:45:35Z",
    "latitude": 32.378903,
    "longitude": -122.457324,
    "file_list": ["a.mp4", "b.mp4"]
}
```

#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Alarm saved successfully!",
    "alarm": {
        "file_list": [
            "a.mp4",
            "b.mp4"
        ],
        "_id": "5f69bd96115f1b0013c56411",
        "imei": 12345678,
        "alarm_type": "CRASH",
        "alarm_time": "2020-08-18T16:45:35.000Z",
        "latitude": 32.378903,
        "longitude": -122.457324,
        "__v": 0
    }
}
```
#### Failed Response:
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "invalid token"
}

or 

HTTP/1.1 422 Unprocessable Entity
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Not a Valid Alarm Request."
}
```
### Get Alarm

#### Request:
```
GET /api/alarm/v1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NjExMDEsImV4cCI6MTYwMDc2NDcwMX0.k_xA7rlkOQve1DkvgbLh13zWO1jqGnR048RI_o2dtMc
```
#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Fetched alarms successfully.",
    "alarms": [
        {
            "file_list": [
                "a.mp4",
                "b.mp4"
            ],
            "_id": "5f69bd96115f1b0013c56411",
            "imei": 12345678,
            "alarm_type": "CRASH",
            "alarm_time": "2020-08-18T16:45:35.000Z",
            "latitude": 32.378903,
            "longitude": -122.457324,
            "__v": 0
        }
    ],
    "count": 1
}
```
#### Failed Response:
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "invalid token"
}
```
### Get Alarm on Start_time,End_time,Alarm_Type

#### Request:
```
GET /api/alarm/v2?start_time=2018-08-18T16:45:35.000Z&end_time=2021-08-18T16:45:35.000Z&alarm_type=CRASH HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NjExMDEsImV4cCI6MTYwMDc2NDcwMX0.k_xA7rlkOQve1DkvgbLh13zWO1jqGnR048RI_o2dtMc
```
#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Fetched alarms successfully.",
    "alarms": [
        {
            "file_list": [
                "a.mp4",
                "b.mp4"
            ],
            "_id": "5f69bd96115f1b0013c56411",
            "imei": 12345678,
            "alarm_type": "CRASH",
            "alarm_time": "2020-08-18T16:45:35.000Z",
            "latitude": 32.378903,
            "longitude": -122.457324,
            "__v": 0
        }
    ],
    "count": 1
}
```
#### Failed Response:
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "invalid token"
}
```

### Post Video

#### Request:
```
POST /api/video/v1 HTTP/1.1
Accept: application/json
Content-Type: multipart/form-data
Content-Length: xy
{
    'imei':1234567
    'filename':'video_file.mp4'
    'video':video_file
}

```
#### Successful Response:
```
HTTP/1.1 200 OK
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Viedo saved successfully!",
    "video": {
        "_id": "5f69e5373a5e940013a764c6",
        "imei": 12345678,
        "filename": "2020-09-22T11:51:19.252Z-SampleVideo_1280x720_1mb.mp4",
        "filepath": "/src/src/videos/2020-09-22T11:51:19.252Z-SampleVideo_1280x720_1mb.mp4",
        "__v": 0
    }
}
```
#### Failed Response:
```
HTTP/1.1 422 Unprocessable Entity
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "Invalid File."
}
```

### Get Video
#### Request:
```
GET /api/video/v1 HTTP/1.1
Accept: application/json
Content-Type: multipart/form-data
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiTE9HSU4iLCJpbWVpIjoiMTIzNDU2NzgiLCJpYXQiOjE2MDA3NzU3OTQsImV4cCI6MTYwMTM4MDU5NH0.g34dZDsswxK4raxvjvziabFHLjEQZWFBOu5LcdHDcR0
```
#### Successful Response:
```
Returns a zip file of all the videos clips for the given imei
```
#### Failed Response:
```
HTTP/1.1 401 Unauthorized
Server: nginx/1.19.2
Content-Type: application/json
Content-Length: xy
{
    "message": "invalid token"
}
```

