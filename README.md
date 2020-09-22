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


```
POST - /api/command
```

```
POST - /api/location
```

```
POST - /api/alarm/v1
```

```
GET - /api/alarm/v1
```

```
GET - /api/alarm/v2
```

```
POST - /api/video/v1
```

```
GET - /api/video/v1
```







