

 //call method to start detecting objectsgg
start_object_detection();

 //--------------------- Head Movements ------------------------\\
 
var objectFound = false;
var timeout = 50; // number of surveils until timeout
var i=0;
function _look_around() { //
    while(objectFound == false && i <= 5)
    {
        var pauseTime = 500; // amount of time to pause between switches in milliseconds
        misty.MoveHeadDegrees(-40, 0, 81); // misty moves head to top left corner
        //misty.Speak("TOP LEFT");

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(-40, 0, 0);
        //misty.Speak("TOP MIDDLE"); 

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(-40, 0, -81);
        //misty.Speak("TOP RIGHT"); 

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(0, 0, -81);
        //misty.Speak("MIDDLE RIGHT"); 

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(40, 0, -81);
        //misty.Speak("BOTTOM RIGHT"); 

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(40, 0, 0);
        //misty.Speak("BOTTOM MIDDLE"); 

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(40, 0, 81);
        //misty.Speak("BOTTOM LEFT");

        misty.Pause(pauseTime);
        misty.MoveHeadDegrees(0, 0, 81);
        //misty.Speak("MIDDLE LEFT"); 

        misty.Pause(pauseTime);
        i++;
        misty.Debug("The incrementer is at: " + i);
    }
}
// dance after completing revolutions
function _dance() {
    //call function that will drive in an arc
    //parameters:heading =-20, radius=0.0001, time = 500milliseconds
    misty.DriveArc(-20, 0.0001, 500, false);
    //pause for 1000 milliseconds
    misty.Pause(1000);
    //call function that will drive in an arc
    //parameters:heading =20, radius=0.0001, time = 500milliseconds
    misty.DriveArc(20, 0.0001, 500, false);
    //pause for 1000 milliseconds
    misty.Pause(1000);
    //register a timer for the event
    //set the timer to 3000 milliseconds
    if (repeat) misty.RegisterTimerEvent(
        "turning",
        3000,
        false);
}
 
// have misty start to surveil 
_look_around();
_dance();



 // -------------------------- Support Function------------------------------------------------
 
 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 // Object Detection
 function start_object_detection() {
     // If you would like to get data only about say object - dog use the below line
     // If you prefer to get data about all 70 objects comment it out
     misty.AddPropertyTest("object_detection", "Description", "==", "chair", "string");
 
     // Argument 1: Data from human pose estimation is streamed into the callback function
     // Argument 2: Event Name (do not change this) 
     // Argument 3: Debounce in milliseconds (least time between updates)
     // Argument 4: Live forever
     misty.RegisterEvent("object_detection", 5000, false); //search for the object every few seconds until it is found
 
     // Argument 1: Minimum confidence required (float) 0.0 to 1.0 
     // Argument 2: ModelId (int) 0 - 3 
     // Argument 3: MaxTrackHistory - Consistently maintains ID of object across x points in history
     // Argument 4: (optinal) DelegateType (int) - 0 (CPU), 1 (GPU), 2 (NNAPI), 3 (Hexagon)  
     misty.StartObjectDetector(0.51, 0, 25);
 
 
 }
 
 //define variables that will store string data from object detected
 var theA = "";
 var currObject = "";
 function _object_detection(data) {
     var object_info = data.PropertyTestResults[0].PropertyParent;
     misty.Debug("OBJ detection code is now executing...");
     theA = object_info.Description.toString();
     if (theA == "chair" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.6) //minimum confidence should be at least 60%
     {
         misty.UnregisterEvent("look_around");//stop misty from looking around immediately
 
         //we can do this for each object we select on dashboard....whenever that functionality is added
         misty.Debug("We have located the CHAIR your job is DONE HERE STOP");
 
         //misty reacts to finding the cup
         misty.ChangeLED(50, 150, 50);
         misty.MoveArmDegrees("both", 90, 100); 
         misty.MoveHeadPosition(-5, 0, 0, 100);
         misty.Speak("The job is done, I found a CHAIR");
        
         //misty stops all operations
         misty.Stop();
       //  misty.Pause(3000);
         misty.MoveArmDegrees("both", 0, 100); //reset positions to normal.
         misty.MoveHeadPosition(0, 0, 0, 100);
 
          //unregister events so that misty doesn't continue moving/looking around 
         misty.UnregisterEvent("object_detection");
         misty.UnregisterAllEvents();
     }
 
 }
 
 misty.RegisterEvent("object_detection", "ObjectDetection", 500, true); //misty will keep searching for obj..misty
 
 // Misty can detect and provide information about 70 different objects:
 // person
 // bicycle
 // car
 // motorcycle
 // airplane
 // bus
 // train
 // truck
 // boat
 // traffic light
 // fire hydrant
 // stop sign
 // parking meter
 // bench
 // bird
 // cat
 // dog
 // horse
 // sheep
 // cow
 // elephant
 // bear
 // zebra
 // giraffe
 // backpack
 // umbrella
 // handbag
 // tie
 // suitcase
 // frisbee
 // skis
 // snowboard
 // sports ball
 // kite
 // baseball bat
 // baseball glove
 // skateboard
 // surfboard
 // tennis racket
 // bottle
 // wine glass
 // cup
 // fork
 // knife
 // spoon
 // bowl
 // banana
 // apple
 // sandwich
 // orange
 // broccoli
 // carrot
 // hot dog
 // pizza
 // donut
 // cake
 // chair
 // couch
 // potted plant
 // bed
 // dining table
 // toilet
 // tv
 // laptop
 // mouse
 // remote
 // keyboard
 // cell phone
 // microwave
 // oven
 // toaster
 // sink
 // refrigerator
 // book
 // clock
 // vase
 // scissors
 // teddy bear
 // hair drier
 // toothbrush