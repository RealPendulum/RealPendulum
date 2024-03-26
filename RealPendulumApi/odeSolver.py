import numpy as np
from scipy.integrate import solve_ivp
import json
import sys

args = sys.argv[1:]
if len(args) != 7:
    sys.stderr.write("Invalid number of arguments. Expected 6 arguments.")
    sys.exit(1)

duration = float(args[0].replace(",", "."))
timeStep = float(args[1].replace(",",".")) / 1000
acceleration = float(args[2].replace(",", "."))
length = float(args[3].replace(",", "."))
initialAngle = float(args[4].replace(",", "."))
initialSpeed = float(args[5].replace(",", "."))
isExact = bool(args[6])


def exact_ode_func(t, y):
    # y[0] = x, y[1] = dx/dt
    return [y[1], -(acceleration / length) * np.sin(y[0])]


def simplified_ode_func(t, y):
    # y[0] = x, y[1] = dx/dt
    return [y[1], -(acceleration / length) * y[0]]


ode_func = exact_ode_func if isExact else simplified_ode_func

# Initial conditions: x(0) = 0, dx/dt(0) = 1
y0 = [initialAngle, initialSpeed]

# Time range
t_span = [0, duration]
# Generate time points
t_points = np.arange(0, duration, timeStep)

# Solve the ODE
sol = solve_ivp(ode_func, [t_points[0], t_points[-1]], y0, t_eval=t_points)

resultJSON = {"t": sol.t.tolist(), "y": sol.y[0].tolist()}

sol_json = json.dumps(resultJSON)

# Print the solution as JSON object
print(sol_json)
