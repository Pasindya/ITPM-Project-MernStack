import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const GuiderSidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-gradient-to-b from-[#1a1f36] to-[#2d3748] shadow-lg border-r border-gray-700 text-white">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-600">
        <img className="w-10 h-10" src={assets.real} alt="Logo" />
        <h2 className="text-lg font-bold tracking-wide">Guider Panel</h2>
      </div>

      {/* Sidebar Sections */}
      <div className="pt-6 pl-6 text-[15px] space-y-6">
        {/* Guider Management */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Guider Management</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/add">
            <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
            <p className="hidden md:block font-medium">Add New Guider</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/list">
            <img className="w-5 h-5" src={assets.list_icon} alt="List Icon" />
            <p className="hidden md:block font-medium">All Guiders</p>
          </NavLink>
        </div>

        {/* Tour Management */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Tour Management</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/tours">
            <img className="w-5 h-5" src={assets.sp} alt="Tours Icon" />
            <p className="hidden md:block font-medium">Manage Tours</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/schedule">
            <img className="w-5 h-5" src={assets.calendar_icon} alt="Schedule Icon" />
            <p className="hidden md:block font-medium">Tour Schedule</p>
          </NavLink>
        </div>

        {/* Performance & Reviews */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Performance & Reviews</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/ratings">
            <img className="w-5 h-5" src={assets.star_icon} alt="Ratings Icon" />
            <p className="hidden md:block font-medium">Guider Ratings</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/feedback">
            <img className="w-5 h-5" src={assets.fb} alt="Feedback Icon" />
            <p className="hidden md:block font-medium">Customer Feedback</p>
          </NavLink>
        </div>

        {/* Reports & Analytics */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Reports & Analytics</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/reports">
            <img className="w-5 h-5" src={assets.chart_icon} alt="Reports Icon" />
            <p className="hidden md:block font-medium">Performance Reports</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/guider/earnings">
            <img className="w-5 h-5" src={assets.money_icon} alt="Earnings Icon" />
            <p className="hidden md:block font-medium">Earnings Summary</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default GuiderSidebar;