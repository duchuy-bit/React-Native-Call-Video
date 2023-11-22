const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// var fcm = require("fcm-notification");
var fcm = require("fcm-node");
var FCM = new fcm("./serviceAccountKey.json");
// var Key = "./AuthKey_93JKT8SSVF.p8";
const app = express();
// var apn = require("apn");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.listen(3000);

app.listen(9000, () => {
    console.log(`API server listening at http://localhost:9000`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/initiate-call", (req, res) => {
    console.log("initiate-call fdsfsdf");
    // const { calleeInfo, callerInfo, videoSDKInfo } = req.body;

    console.log("initiate-call fdsfsdf");

    // if (calleeInfo.platform === "iOS") {
    //   let deviceToken = calleeInfo.APN;
    //   var options = {
    //     token: {
    //       key: Key,
    //       keyId: "YOUR_KEY_ID",
    //       teamId: "YOUR_TEAM_ID",
    //     },
    //     production: true,
    //   };

    //   var apnProvider = new apn.Provider(options);

    //   var note = new apn.Notification();

    //   note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    //   note.badge = 1;
    //   note.sound = "ping.aiff";
    //   note.alert = "You have a new message";
    //   note.rawPayload = {
    //     callerName: callerInfo.name,
    //     aps: {
    //       "content-available": 1,
    //     },
    //     handle: callerInfo.name,
    //     callerInfo,
    //     videoSDKInfo,
    //     type: "CALL_INITIATED",
    //     uuid: uuidv4(),
    //   };
    //   note.pushType = "voip";
    //   note.topic = "org.reactjs.ReactNativeCallTrigger.voip";
    //   apnProvider.send(note, deviceToken).then((result) => {
    //     if (result.failed && result.failed.length > 0) {
    //       console.log("RESULT", result.failed[0].response);
    //       res.status(400).send(result.failed[0].response);
    //     } else {
    //       res.status(200).send(result);
    //     }
    //   });
    // } else
    // if (calleeInfo.platform === "ANDROID") {
    console.log("  ANDROID");
    var FCMtoken = calleeInfo.token;

    console.log("  ok");
    const info = JSON.stringify({
        callerInfo,
        videoSDKInfo,
        type: "CALL_INITIATED",
    });
    var message = {
        data: {
            info,
        },
        android: {
            priority: "high",
        },
        token: FCMtoken,
    };
    console.log(" call");
    FCM.send(message, function (err, response) {
        if (err) {
            res.status(200).send(response);
            console.log("Something has gone wrong!", err);
        } else {
            res.status(400).send(response);
            console.log("Successfully sent with response: ", response);
        }
    });
    // }
    // else {
    //     res.status(400).send("Not supported platform");
    // }
});

app.post("/update-call", (req, res) => {
    console.log(" update-calladasd");
    const { callerInfo, type } = req.body;
    const info = JSON.stringify({
        callerInfo,
        type,
    });

    var message = {
        data: {
            info,
        },
        apns: {
            headers: {
                "apns-priority": "10",
            },
            payload: {
                aps: {
                    badge: 1,
                },
            },
        },
        token: callerInfo.token,
    };

    FCM.send(message, function (err, response) {
        if (err) {
            res.status(200).send(response);
        } else {
            res.status(400).send(response);
        }
    });
});

// exports.app = functions.https.onRequest(app);
