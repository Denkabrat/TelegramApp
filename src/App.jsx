import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./Components/MainPage/MainPage"
import LessonPage from "./Components/LessonPage/LessonPage";
import freeData from "./data/FreeData";
import paidData from "./data/PaidData";
import url from './url'

function App() {

  let tg = window.Telegram.WebApp;
  const [user, getUser] = useState()
  const [viewFree, getViewFree] = useState()
  const [viewPaid, getViewPaid] = useState()
  useEffect(() => {
    tg.setHeaderColor('#ffffff')
    tg.expand()
    tg.enableClosingConfirmation()
    getUserInfo()
    getViews()
  }, []);

  const getUserInfo = () => {
    fetch(`${url}/_internal_/profile`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getUser(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const getViews = () => {
    fetch(`${url}/_internal_/get_views`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const materialsFree = freeData.map(free_material => {
          const material = data.materials.find(material => { return material.type == "free" && material.number == free_material.number })
          return { ...free_material, views: material.views }
        })
        getViewFree(materialsFree)
        const materialsPaid = paidData.map(paid_material => {
          const material = data.materials.find(material => { return material.type == "paid" && material.number == paid_material.number })
          return { ...paid_material, views: material.views }
        })
        getViewPaid(materialsPaid)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className='app'>
      <div className='appHeigt'>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage user={user} viewFree={viewFree} viewPaid={viewPaid} />} />
            <Route path="/free/:id" element={<LessonPage viewFree={viewFree} viewPaid={viewPaid} />} />
            <Route path="/paid/:id" element={<LessonPage viewFree={viewFree} viewPaid={viewPaid} />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App

