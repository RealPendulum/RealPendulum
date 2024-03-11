import numpy as np
from scipy.integrate import solve_ivp
import json
import sys
import matplotlib.pyplot as plt

# Read command line arguments
args = sys.argv[1:]
if len(args) != 6:
    # print("Invalid number of arguments. Expected 6 arguments.")
    sys.exit(1)

# Extract arguments
# pythonScriptPath = args[0]
duration = float(args[0])
timeStep = float(args[1]) / 1000
acceleration = float(args[2])
length = float(args[3])
initialAngle = float(args[4])
initialSpeed = float(args[5])

# Rest of the code...


def ode_func(t, y):
    return [y[1], -(acceleration / length) * y[0]]


# Initial conditions: x(0) = 0, dx/dt(0) = 1
y0 = [initialAngle, initialSpeed]

# Time range
t_span = [0, duration]

# Solve the ODE
sol = solve_ivp(ode_func, t_span, y0, max_step=timeStep)

# Print the solution as JSON object
# Convert the solution to a JSON object
# sol_json = json.dumps({"y_t": sol.y.tolist()})
sol_json = json.dumps(sol.y[0].tolist())
# Print the solution as JSON object
print(sol_json)

# print to error stream
sys.stderr.write(str(sol.t.tolist()))

# Plot the solution
# plt.plot(sol.t, sol.y[0])
# plt.xlabel("Time (t)")
# plt.ylabel("x(t)")
# plt.title("Numerical Solution of dx^2/dt^2 = -sin(x)")
# plt.grid(True)
# plt.show()
