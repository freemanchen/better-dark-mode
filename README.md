# Better Dark Mode Chrome Extension
Gives pages a better dark mode by avoiding things like full white text on full black test which isn't really much better on the eyes.

# Notes:
- Creates a dark mode of any page by inverting the original colors, background-colors, border-colors.
- Unlike most "dark modes," Better Dark Mode reduces eye-strain by not allowing any RGB values below 50 or above 200 by default.  Darkness and brightness limits can be customized by user.

# Potential updates
- Store the active/inactive state as well as darkness/brightness limit variables Chrome-wide (currently using localStorage)
