import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FullScreenLoadingSpinner } from "../shared";
import Default from "../layouts/Default";

import { Meetings, Home } from "../features/meeting";

export default function ApplicationRoutes() {
    return (
        <Suspense fallback={<FullScreenLoadingSpinner />}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Default>
                                <Home />
                            </Default>}
                    />
                    <Route
                        path="/meetings/:id"
                        element={
                            <Default>
                                <Meetings />
                            </Default>}
                    />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}