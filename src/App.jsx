import { useContext, useEffect, useState, useRef } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";
import AdminBanner from "./components/AdminBanner";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatContext } from "./context/chatContext";
import { generateToken, messaging } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import PageSelection from "./components/PageSelection";
import Navbar from "./components/Navbar";
import { MobileContext } from "./context/mobileContext";
import Footer from "./components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("top");
  const navigate = useNavigate();
  const location = useLocation();
  const { currentAdmin, isAdmin, onAdminLogin, setDeviceTokenId } =
    useContext(ChatContext);
  const { isMobile } = useContext(MobileContext);
  const appRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/admin" && !isAdmin) {
      navigate("/");
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const admin = JSON.parse(urlParams.get("admin"));
      if (admin) {
        handleGetToken(admin.id);
        onMessage(messaging, (payload) => {
          toast(payload.notification.body);
        });
        onAdminLogin(admin);
        navigate("/admin");
      }
    }
  }, []);

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page.trigger.className.split(" ")[0].split("_")[1].split("Section")[0]);
  };

  useGSAP(() => {
    gsap.utils.toArray(".main-section").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "15% bottom",
        end: "10%",
        onEnter: handleSetCurrentPage,
        onEnterBack: handleSetCurrentPage
      });

      ScrollTrigger.create({
        trigger: section,
        start: "95% bottom",
        end: "10%",
        onEnter: handleSetCurrentPage,
        onEnterBack: handleSetCurrentPage
      })
    });
  });

  const handleGetToken = async (admin_id) => {
    const token_id = await generateToken(admin_id);
    if (token_id) setDeviceTokenId(token_id);
  };

  const handleSetShowChat = () => {
    setShowChat((previousValue) => !previousValue);
  };

  const onMenuBtnClick = () => {
    setShowMenu((previous) => !previous);
  };

  return (
    <section className="app" ref={appRef}>
      <Toaster />
      {isAdmin && <AdminBanner />}
      {isMobile && (
        <Navbar
          navData={devData.navLinks}
          showMenu={showMenu}
          handleMenuBtnClick={onMenuBtnClick}
        />
      )}
      {!isMobile && <PageSelection currentPage={currentPage}/>}
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
        showChat={showChat}
        isAdmin={isAdmin}
        currentAdmin={currentAdmin}
        navData={devData.navLinks}
        showMenu={showMenu}
        handleMenuBtnClick={onMenuBtnClick}
      />
      <AboutSection aboutSectionData={devData.aboutSection} />
      <WorksSection worksSectionData={devData.worksSection} />
      <Footer />
      {showChat && (
        <ChatBox showChat={showChat} handleSetShowChat={handleSetShowChat} />
      )}
    </section>
  );
}

export default App;
