import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";




const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-gradient-to-b from-[#1a1f36] to-[#2d3748] shadow-lg border-r border-gray-700 text-white">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-600">
        <img className="w-10 h-10" src={assets.real} alt="Logo" />
        <h2 className="text-lg font-bold tracking-wide">Admin Panel</h2>
      </div>

      {/* Sidebar Sections */}
      <div className="pt-6 pl-6 text-[15px] space-y-6">
        {/* Property Management */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Property Management</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/add">
            <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
            <p className="hidden md:block font-medium">Add Property</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/list">
            <img className="w-5 h-5" src={assets.list_icon} alt="List Icon" />
            <p className="hidden md:block font-medium">List Properties</p>
          </NavLink>
        </div>

        {/* Customer Service Management */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Support Ticket  Management</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/adminticket">
            <img className="w-5 h-5" src={assets.sp} alt="Dashboard Icon" />
            <p className="hidden md:block font-medium">Admin Dashboard</p>
          </NavLink>
        </div>

        {/* Feedback Management */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Feedback Management</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/all">
            <img className="w-5 h-5" src={assets.fb} alt="Feedback Icon" />
            <p className="hidden md:block font-medium">Admin Dashboard</p>
          </NavLink>
        </div>

        {/* Booking and Property Management */}
        <div>
          <h3 className="text-gray-300 uppercase font-semibold text-sm mb-3">Booking & Property Management</h3>
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#374151] transition-all" to="/orders">
            <img className="w-5 h-5" src={assets.bm} alt="Booking Icon" />
            <p className="hidden md:block font-medium">Admin Dashboard</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
