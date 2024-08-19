import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import QuestionsArea from "./QuestionsArea";
//import WhatNext from "./WhatNext";
import { flags } from "./Flags";
//import notes from "../notes.js";
import "../flagQuizApp.css";

function App(){
    return(
    <React.StrictMode>
    <Header/>
    <QuestionsArea
    questions={flags.questions}
    />
    <Footer/>
    </React.StrictMode>
    )
}

export default App;