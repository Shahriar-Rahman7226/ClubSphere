// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import StudentDashboard from "./pages/student_dashboard";
import ClubHome from "./pages/club_homepage";
import ClubEvent from "./pages/club_event";
import ClubEventDetails from "./pages/club_event_details";
import ClubProfile from "./pages/club_profile";
import ClubMembership from "./pages/club_membership";
import About from "./pages/about";
import AdminDashboard from "./pages/admin_dashboard";
import AdminPost from "./pages/admin_post";
import CreatePost from "./pages/create_post";
import CreateEvent from "./pages/create_event";
import CreateRecruitment from "./pages/create_recruitment";
import EditPost from "./pages/edit_post";
import EditEvent from "./pages/edit_event";
import EditRecruitment from "./pages/edit_recruitment";
import AdminEvent from "./pages/admin_event";
import AdminRecruitment from './pages/admin_recruitment';
import EditClub from './pages/edit_club';
import AdminMembership from "./pages/admin_membership";
import EditMembership from "./pages/edit_membership";
import UserProfile from "./pages/user_profile";
import ResetPassword from "./pages/reset_password";
import EditProfile from "./pages/edit_profile";
import Setup from "./pages/clubsphere_setup";
import CreateUniversity from "./pages/create_university";
import SuperAdminDashboard from './pages/super_admin_dashboard';
import EditUniversity from "./pages/edit_university";
import SuperAdminSignUp from "./pages/super_admin_signup";
import CreateClub from "./pages/create_club";
import AdminSignUp from "./pages/admin_signup";
import EventManagement from "./pages/event_management";
import PostManagement from './pages/post_management';
import RecruitmentManagement from './pages/recruitment_management';
import MemberManagement from './pages/member_management';




function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} />
            <Route path="/student_dashboard" element={<StudentDashboard />} />
            <Route path="/club_homepage" element={<ClubHome />} />
             <Route path="/club_event" element={<ClubEvent />} />
              <Route path="/club_event_details" element={<ClubEventDetails />} />
                <Route path="/club_profile" element={<ClubProfile />} />
                 <Route path="/club_membership" element={<ClubMembership />} />
                  <Route path="/about" element={<About />} />
                   <Route path="/admin_dashboard" element={<AdminDashboard />} />
                     <Route path="/admin_post" element={<AdminPost />} />
                        <Route path="/create_post" element={<CreatePost />} />
                         <Route path="/create_event" element={<CreateEvent />} />
                          <Route path="/create_recruitment" element={<CreateRecruitment />} />
                           <Route path="/edit_post" element={<EditPost />} />
                           <Route path="/edit_event" element={<EditEvent />} />
                             <Route path="/edit_recruitment" element={<EditRecruitment />} />
                              <Route path="/admin_event" element={<AdminEvent />} />
                                <Route path="/admin_recruitment" element={<AdminRecruitment />} />
                                  <Route path="/edit_club" element={<EditClub />} />
                                      <Route path="/admin_membership" element={<AdminMembership />} />
                                       <Route path="/edit_membership" element={<EditMembership />} />
                                         <Route path="/user_profile" element={<UserProfile />} />
                                           <Route path="/reset_password" element={<ResetPassword />} />
                                           <Route path="/edit_profile" element={<EditProfile />} />
                                            <Route path="/clubsphere_setup" element={<Setup />} />
                                            <Route path="/create_university" element={<CreateUniversity />} />
                                             <Route path="/super_admin_dashboard" element={<SuperAdminDashboard />} />
                                              <Route path="/edit_university" element={<EditUniversity />} />
                                              <Route path="/super_admin_signup" element={<SuperAdminSignUp />} />
                                                      <Route path="/create_club" element={<CreateClub />} />
                                                       <Route path="/admin_signup" element={<AdminSignUp />} />
                                                          <Route path="/event_management" element={<EventManagement />} />
                                                             <Route path="/post_management" element={<PostManagement />} />
                                                                <Route path="/recruitment_management" element={<RecruitmentManagement />} />
                                                                 <Route path="/member_management" element={<MemberManagement />} />
        </Routes>
      </Router>
  )}

export default App
