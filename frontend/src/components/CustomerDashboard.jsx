import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './CustomerDashboard.css';

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

const serviceLabels = {
    acRepair: 'AC Repair', mechanicRepair: 'Mechanic Repair',
    electricalRepair: 'Electrical Repair', electronicRepair: 'Electronics Repair',
    plumber: 'Plumbing', packersMovers: 'Packers & Movers'
};

const serviceEmojis = {
    acRepair: '❄️', mechanicRepair: '🔧', electricalRepair: '⚡',
    electronicRepair: '📱', plumber: '🔩', packersMovers: '📦'
};

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
];

const CustomerDashboard = () => {
    const { authToken, currentUser } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

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

    // Derived counts
    const safeReqs = Array.isArray(requests) ? requests : [];
    const totalCount = safeReqs.length;
    const completedCount = safeReqs.filter(r => r.status === 'completed').length;
    const pendingCount = safeReqs.filter(r => r.status === 'pending').length;

    // Filtered list
    const filtered = activeFilter === 'all'
        ? safeReqs
        : safeReqs.filter(r => r.status === activeFilter);

    return (
        <div className="cd">

            {/* ── HEADER ─────────────────────────────────── */}
            <header className="cd-header">
                <div className="cd-header-left">
                    <h1 className="cd-title">My Service Requests</h1>
                    <p className="cd-subtitle">Track and manage all your service bookings</p>
                </div>
                <div className="cd-header-right">
                    <button className="cd-bell" title="Notifications">🔔</button>
                    <Link to="/create-request" className="cd-new-req">+ <span>New Request</span></Link>
                </div>
            </header>

            <div className="cd-content">

                {/* ── ERROR ───────────────────────────────── */}
                {error && <div className="cd-error">{error}</div>}

                {/* ── STATS ROW ───────────────────────────── */}
                <div className="cd-stats">
                    <div className="cd-stat cd-stat--total">
                        <span className="cd-stat-icon">📋</span>
                        <div className="cd-stat-info">
                            <span className="cd-stat-count">{totalCount}</span>
                            <span className="cd-stat-label">Total Requests</span>
                        </div>
                    </div>
                    <div className="cd-stat cd-stat--done">
                        <span className="cd-stat-icon">✅</span>
                        <div className="cd-stat-info">
                            <span className="cd-stat-count">{completedCount}</span>
                            <span className="cd-stat-label">Completed</span>
                        </div>
                    </div>
                    <div className="cd-stat cd-stat--pending">
                        <span className="cd-stat-icon">⏳</span>
                        <div className="cd-stat-info">
                            <span className="cd-stat-count">{pendingCount}</span>
                            <span className="cd-stat-label">Pending</span>
                        </div>
                    </div>
                </div>

                {/* ── FILTER TABS ─────────────────────────── */}
                <div className="cd-filters">
                    {FILTERS.map(f => (
                        <button key={f.key}
                            className={`cd-filter ${activeFilter === f.key ? 'cd-filter--active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* ── LOADING SKELETONS ───────────────────── */}
                {loading ? (
                    <div className="cd-skeletons">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="cd-skeleton" />
                        ))}
                    </div>

                    /* ── EMPTY STATE ──────────────────────────── */
                ) : filtered.length === 0 ? (
                    <div className="cd-empty">
                        <span className="cd-empty-icon">📋</span>
                        <h3>{activeFilter === 'all' ? 'No requests yet' : `No ${activeFilter} requests`}</h3>
                        <p>{activeFilter === 'all' ? 'Book your first service to get started' : 'Try a different filter'}</p>
                        {activeFilter === 'all' && (
                            <Link to="/create-request" className="cd-empty-btn">+ Book a Service</Link>
                        )}
                    </div>

                    /* ── REQUEST CARDS ────────────────────────── */
                ) : (
                    <div className="cd-cards">
                        {filtered.map(req => {
                            const locInfo = getLocationInfo(req.location);
                            const statusClass = (req.status || '').replace(/\s+/g, '-');
                            const workerInitial = req.assignedWorker?.username?.charAt(0)?.toUpperCase() || '?';

                            return (
                                <div key={req._id} className={`cd-card cd-card--${statusClass}`}>
                                    <div className="cd-card-inner">

                                        {/* Map (left on desktop, top on mobile) */}
                                        {locInfo.coords && (
                                            <div className="cd-card-map">
                                                <MapContainer
                                                    center={locInfo.coords}
                                                    zoom={14}
                                                    style={{ height: '100%', width: '100%' }}
                                                    scrollWheelZoom={false}
                                                    dragging={false}
                                                    zoomControl={false}
                                                >
                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                    <Marker position={locInfo.coords}>
                                                        <Popup>{locInfo.address}</Popup>
                                                    </Marker>
                                                </MapContainer>
                                            </div>
                                        )}

                                        {/* Details (right) */}
                                        <div className="cd-card-details">
                                            {/* Service title + badge */}
                                            <div className="cd-card-top">
                                                <span className="cd-card-service">
                                                    <span className="cd-card-service-emoji">
                                                        {serviceEmojis[req.serviceType] || '🛠️'}
                                                    </span>
                                                    {serviceLabels[req.serviceType] || req.serviceType}
                                                </span>
                                                <span className={`cd-badge cd-badge--${statusClass}`}>
                                                    {(req.status || '').replace('-', ' ').toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Meta info */}
                                            <div className="cd-card-meta">
                                                <div className="cd-meta-item">📍 <span>{locInfo.address}</span></div>
                                                <div className="cd-meta-item">📅 <span>{new Date(req.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                                            </div>

                                            {req.description && (
                                                <div className="cd-card-desc">📝 {req.description}</div>
                                            )}

                                            {/* Assigned worker card */}
                                            {req.assignedWorker && (
                                                <div className="cd-worker-card">
                                                    <div className="cd-worker-avatar">{workerInitial}</div>
                                                    <div className="cd-worker-info">
                                                        <span className="cd-worker-name">{req.assignedWorker.username}</span>
                                                        {req.assignedWorker.phone && (
                                                            <span className="cd-worker-phone">📞 {req.assignedWorker.phone}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Timing pills */}
                                            {(req.checkInTime || req.checkOutTime) && (
                                                <div className="cd-times">
                                                    {req.checkInTime && (
                                                        <span className="cd-time-in">✓ In: {new Date(req.checkInTime).toLocaleTimeString('en-IN')}</span>
                                                    )}
                                                    {req.checkOutTime && (
                                                        <span className="cd-time-out">⏎ Out: {new Date(req.checkOutTime).toLocaleTimeString('en-IN')}</span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {(req.status === 'completed' || req.status === 'pending') && (
                                                <div className="cd-card-actions">
                                                    {req.status === 'completed' && (
                                                        <Link to="/create-request" className="cd-action cd-action--rebook">🔁 Rebook</Link>
                                                    )}
                                                    {req.status === 'pending' && (
                                                        <button className="cd-action cd-action--cancel"
                                                            onClick={() => { /* placeholder */ }}>
                                                            ❌ Cancel
                                                        </button>
                                                    )}
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
        </div>
    );
};

export default CustomerDashboard;
