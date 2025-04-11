import { configureStore } from '@reduxjs/toolkit'
import { reportApi } from './api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reportApi.middleware),
})

setupListeners(store.dispatch)