## NextJS Weather App

Simple NextJS app that displays the current weather and the forecast for the next 3 days of the user inputted city. User can also decide the unit in which to display temperatures.

Built with: 
- Next.js
- Axios
- TailwindCSS

Dependencies:
- Node v22

## Setup 

Clone repository and then run the following command to install the required dependencies:

```
git clone git@github.com:ilincaion/weather-app.git
cd weather-app
npm install 
```

Once this is done, the application can be ran using the dev script 

```
npm run dev
```

!! A .env file should be added at the root of the project. It should specify a valid OpenWeatherMap API key under the WEATHER_API_KEY variable name

For a production ready version, run the build and start scripts:

```
npm run build
npm run start
```
## Architectural Decisions

The frontend is build using components so that code is more modulare and reusable. There are 3 components: SearchForm which contains the user inputted information, and two components for displaying the retireved data from the api call: one for the current data and one for the forecast (based on the calls made in the backend). 


The client fecthes the data via the API route. It passing relevant query parameters like city and unit to the backend which processes the request. The backend makes server-side API calls to the OpenWeatherMap API to fecth the desired data and returns the weather data in the expected typed format. The API key used is stored in a .env file which cannot be accessed through the frontend, keeping sensitive information secure. 

Errors and handled on both client and server side, with meaningful error messages showed to the user when there is unexpected behaviour.
