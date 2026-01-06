import { lazy } from "react";

const Meetings = lazy(() => import("./pages/Meetings"))
const Home = lazy(() => import("./pages/Home"))

export {
    Meetings,
    Home
}