import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import StatusTracker from "./StatusTracker";

const TrackDetails = () => {
  const { requestId } = useParams();
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/service/tracking/${requestId}`);
      setTracking(res.data);
    };
    fetchData();
  }, [requestId]);

  if (!tracking) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Request Tracking
      </h2>

      <StatusTracker
        trackingStatus={tracking.trackingStatus}
        trackingHistory={tracking.trackingHistory}
      />
    </div>
  );
};

export default TrackDetails;
