import React, { useEffect, useState } from "react";
// Highlight: เพิ่มการ import service ที่จำเป็น
import { getAllUsers, updateUserRole, banUser } from "../../libs/adminService";
import { PieChart } from "@mui/x-charts/PieChart";

const ButtonStyle = ({ text, textColor, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-24 ${bgColor} ${textColor} items-center justify-center cursor-pointer`}
    >
      {text}
    </button>
  );
};

const UserBox = ({ user, onEditRole, onBan }) => {
  return (
    <div
      className={`flex h-26 w-full bg-white border border-gray-200 p-4 shadow-[0_0_1px_1px_rgba(221,221,221,0.7)] flex-shrink-0`}
    >
      <div className="flex-1 flex flex-col gap-3 justify-center text-[14px]">
        <div>username: {user.username}</div>
        <div>email: {user.email}</div>
        <div>status: <span className={user.status === 'banned' ? 'text-red-500 font-bold' : 'text-green-500'}>{user.status || 'active'}</span></div>
      </div>
      <div className="flex-1 flex gap-2 items-center justify-end">
        <ButtonStyle
          text="Edit Role"
          textColor="text-white"
          bgColor="bg-[#48B3AF]"
          onClick={() => onEditRole(user._id, user.userType)}
        />
        <ButtonStyle
          text="Ban"
          textColor="text-white"
          bgColor="!bg-[#B71F3B]"
          onClick={() => onBan(user._id, user.username)}
        />
      </div>
    </div>
  );
};

function UserPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [view, setView] = useState("Customer"); // "Customer", "Vendor", "Admin"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if (response.success) {
        setAllUsers(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBan = async (userId, username) => {
    if (window.confirm(`Are you sure you want to ban user "${username}"?`)) {
      try {
        await banUser(userId);
        alert(`User ${username} has been banned.`);
        fetchUsers(); 
      } catch (err) {
        alert("Failed to ban user: " + err.message);
      }
    }
  };

  const handleEditRole = async (userId, currentRoles) => {
    const newRoles = prompt(
      `Enter new roles for this user, separated by commas. Current roles: ${currentRoles.join(", ")}`,
      currentRoles.join(", ")
    );

    if (newRoles !== null) {
      const rolesArray = newRoles.split(',').map(role => role.trim());
      try {
        await updateUserRole(userId, rolesArray);
        alert("User roles updated successfully.");
        fetchUsers(); 
      } catch (err) {
        alert("Failed to update roles: " + err.message);
      }
    }
  };

  const filteredUsers = allUsers.filter(user => {
    if (view === 'Admin') {
      return user.userType.includes('admin');
    }
    if (view === 'Vendor') {
      return user.userType.includes('vendor');
    }

    return !user.userType.includes('admin') && !user.userType.includes('vendor');
  });

  if (loading) return <div className="p-14">Loading...</div>;
  if (error) return <div className="p-14 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
        User management
      </div>
      <img
            className="w-full h-[1px] top-[115px] left-[51px] px-[63px]"
            alt="Line"
            src = "https://i.postimg.cc/ZKYXghDG/black-1.png"
          />
      <div className="flex h-130 bg-white justify-center">
        <div className="flex-1 my-6 mx-12 bg-white p-1 text-black">
          <div className="flex gap-2">
            <ButtonStyle text="Customer" textColor="text-white" bgColor={view === 'Customer' ? 'bg-blue-500' : '!bg-gray-400'} onClick={() => setView("Customer")} />
            <ButtonStyle text="Vendor" textColor="text-white" bgColor={view === 'Vendor' ? 'bg-blue-500' : '!bg-gray-400'} onClick={() => setView("Vendor")} />
            <ButtonStyle text="Admin" textColor="text-white" bgColor={view === 'Admin' ? 'bg-blue-500' : '!bg-gray-400'} onClick={() => setView("Admin")} />
          </div>
          <div className="flex flex-col gap-2 mt-6 overflow-y-auto h-100">
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                    <UserBox 
                        key={user._id} 
                        user={user} 
                        onEditRole={handleEditRole}
                        onBan={handleBan}
                    />
                ))
            ) : (
                <p className="text-gray-500 mt-4">No users found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;