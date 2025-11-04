"use client";

import ProtectedRoute from "app/components/ProtectedRoute";
import Profile from "../../../../sections/profile/MainProfilePage";

export default function AccountPageWrapper() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
