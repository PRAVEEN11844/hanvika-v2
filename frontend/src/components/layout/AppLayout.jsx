import React from 'react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
    return (
        <div style={{ display: "flex", width: "100%" }}>
            <Sidebar />
            <div style={{
                marginLeft: "250px",
                width: "calc(100% - 250px)",
                padding: "40px",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
