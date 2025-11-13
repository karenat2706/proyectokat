import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        authenticator: authReducer, //Aquí configuramos la store con el reducer creado en el Slice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch