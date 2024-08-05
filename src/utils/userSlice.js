import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userLocation",
    initialState: {
        cityName: "Vizag, Andhra Pradesh",
        displayName: "Vizag, Andhra Pradesh",
        latitude: "17.7231276",
        longitude:"83.3012842"
    },
    reducers: {
        setUserLocation: (state, action) => {
            state.cityName = action.payload.name;
            state.displayName = action.payload.display_name,
                state.latitude = action.payload.lat;
            state.longitude = action.payload.lon;
            
        }
    }
});

export const { setUserLocation } = userSlice.actions;
export default userSlice.reducer;