import numpy as np
import json
import sys

args = sys.argv[1:]
if len(args) != 7:
    sys.stderr.write("Invalid number of arguments. Expected 6 arguments.")
    sys.exit(1)

duration = float(args[0])
timeStep = float(args[1]) / 1000
acceleration = float(args[2])
length = float(args[3])
initialAngle = float(args[4])
initialSpeed = float(args[5])
isExact = bool(args[6])

omega = np.sqrt(acceleration / length)
if initialSpeed == 0:
    phaseShift = np.pi / 2 * np.sign(initialAngle)
    amplitude = initialAngle
elif initialAngle == 0:
    phaseShift = 0
    amplitude = initialSpeed / omega
else:
    phaseShift = np.arctan(initialAngle * omega / initialSpeed)
    amplitude = initialSpeed / omega / np.sin(phaseShift)


def approx_func(t):
    return amplitude * np.sin(omega * t + phaseShift)


# Time range
t_points = np.arange(0, duration, timeStep)

# Solve the approximation
sol = approx_func(t_points)

resultJSON = {"t": t_points.tolist(), "y": sol.tolist()}

sol_json = json.dumps(resultJSON)

# Print the solution as JSON object
print(sol_json)
