import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Helper: extract location display values from both old string and new object format
const getLocationInfo = (location) => {
    if (!location) return { address: 'N/A', coords: null };
    if (typeof location === 'string') return { address: location, coords: null };
    return {
        address: location.address || 'N/A',
        coords: location.coordinates && location.coordinates.lat && location.coordinates.lng
            ? [location.coordinates.lat, location.coordinates.lng]
            : null
    };
};

const CustomerDashboard = () => {
    const { authToken } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
            const response = await axios.get(`${apiUrl}/api/requests/my`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setRequests(response.data.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching requests:', err);
            setError('Failed to load your service requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authToken) fetchRequests();
    }, [authToken]);

    const getStatusBadge = (status) => {
        const colors = {
            'pending': { bg: '#fef3c7', text: '#92400e' },
            'assigned': { bg: '#dbeafe', text: '#1e40af' },
            'in-progress': { bg: '#ede9fe', text: '#5b21b6' },
            'completed': { bg: '#d1fae5', text: '#065f46' },
            'cancelled': { bg: '#fee2e2', text: '#991b1b' }
        };
        const c = colors[status] || { bg: '#f3f4f6', text: '#374151' };
        return (
            <span style={{
                padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem',
                fontWeight: 600, background: c.bg, color: c.text
            }}>
                {status.replace('-', ' ').toUpperCase()}
            </span>
        );
    };

    const serviceLabels = {
        acRepair: 'AC Repair', mechanicRepair: 'Mechanic Repair',
        electricalRepair: 'Electrical Repair', electronicRepair: 'Electronics Repair',
        plumber: 'Plumbing', packersMovers: 'Packers & Movers'
    };

    if (loading) {
        return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading your requests...</div>;
    }

    return (
        <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>📋 My Service Requests</h2>
                <Link
                    to="/create-request"
                    style={{
                        padding: '10px 18px', borderRadius: 8, background: '#2563eb', color: '#fff',
                        fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem'
                    }}
                >
                    + New Request
                </Link>
            </div>

            {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 16 }}>
                    {error}
                </div>
            )}

            {requests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', color: '#94a3b8' }}>
                    <p style={{ fontSize: '1.1rem' }}>No service requests yet.</p>
                    <Link to="/create-request" style={{ color: '#2563eb' }}>Create your first request →</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {requests.map((req) => {
                        const locInfo = getLocationInfo(req.location);
                        return (
                            <div key={req._id} style={{
                                background: '#fff', borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {/* Map panel */}
                                    {locInfo.coords && (
                                        <div style={{ width: 220, minHeight: 180, flexShrink: 0 }}>
                                            <MapContainer
                                                center={locInfo.coords}
                                                zoom={14}
                                                style={{ height: '100%', width: '100%' }}
                                                scrollWheelZoom={false}
                                                dragging={false}
                                                zoomControl={false}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={locInfo.coords}>
                                                    <Popup>{locInfo.address}</Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    )}

                                    {/* Details panel */}
                                    <div style={{ flex: 1, padding: 20, minWidth: 200 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1e293b' }}>
                                                {serviceLabels[req.serviceType] || req.serviceType}
                                            </span>
                                            {getStatusBadge(req.status)}
                                        </div>
                                        <div style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                            <div>📍 {locInfo.address}</div>
                                            <div>📅 Preferred: {new Date(req.preferredDate).toLocaleDateString()}</div>
                                            {req.description && <div>📝 {req.description}</div>}
                                        </div>
                                        {req.assignedWorker && (
                                            <div style={{ marginTop: 10, padding: '8px 12px', background: '#f0fdf4', borderRadius: 8, fontSize: '0.85rem' }}>
                                                <strong>Assigned:</strong> {req.assignedWorker.username} — 📞 {req.assignedWorker.phone}
                                            </div>
                                        )}
                                        {(req.checkInTime || req.checkOutTime) && (
                                            <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#64748b' }}>
                                                {req.checkInTime && <span style={{ color: '#10b981' }}>In: {new Date(req.checkInTime).toLocaleTimeString()} </span>}
                                                {req.checkOutTime && <span style={{ color: '#3b82f6' }}>Out: {new Date(req.checkOutTime).toLocaleTimeString()}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CustomerDashboard;
