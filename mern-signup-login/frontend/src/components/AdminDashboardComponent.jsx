import React, { useEffect, useState } from 'react';
import fetchAdminData from '../services/adminService';
import '../styles/AdminDashboard.css'; // Assuming you have some styles for this component

const AdminDashboardComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAdminData = async () => {
            try {
                const result = await fetchAdminData();
                setData(result);
            } catch (error) {
                setError('Failed to fetch admin data');
            }
        };

        getAdminData();
    }, []);

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-content">
                {/* Render data here */}
                {data ? (
                    <div>
                        <p>Welcome, Admin!</p>
                        {/* Render options like 'View Bookings', 'Manage Users', etc. */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardComponent;
