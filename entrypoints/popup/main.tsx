import React from "react";
import ReactDOM from "react-dom/client";
import "~/globals.css";
import App from "./App.tsx";
import {Toaster} from "~/components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App/>
        <Toaster richColors position={"top-center"}/>
    </React.StrictMode>
);
