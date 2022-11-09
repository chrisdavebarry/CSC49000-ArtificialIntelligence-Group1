# First import the RobotGenerator
from mistyPy.Robot import RobotRob

# Creating a new robot generator will rewrite the RobotCommands.py and Websocket.py 
# files to adjust them to the commands and websockets the robot has available
RobotGenerator("10.12.132.107")