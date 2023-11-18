import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {getAllUsers} from "@/apis/userApi";
import {getAllNGOs} from "@/apis/ngoApi";

const result = await getAllUsers("admin", "admin");
console.log(result)
const ngos = await getAllNGOs("admin","admin",10)
console.log(ngos)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
