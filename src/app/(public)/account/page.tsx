'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileSidebar } from "../../../../sections/profile/ProfileSidebar";
import { ProfileContent } from "../../../../sections/profile/ProfileContent";

export type ProfileSection = 
  | "account"
  | "orders" 
  | "notifications"
  | "reviews"
  | "voucher"
  | "wishlist"
  | "sellers"
  | "recent"
  | "management"
  | "payment"
  | "address"
  | "newsletter";

const DEFAULT_SECTION: ProfileSection = "account";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionFromUrl = searchParams.get("section") as ProfileSection | null;

  const [activeSection, setActiveSection] = useState<ProfileSection>(DEFAULT_SECTION);

  // Update section from URL on mount
  useEffect(() => {
    if (sectionFromUrl && sectionFromUrl !== activeSection) {
      setActiveSection(sectionFromUrl);
    }
  }, [sectionFromUrl]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <ProfileSidebar
            activeSection={activeSection}
            onSectionChange={(section) => {
              setActiveSection(section);
              router.push(`/account?section=${section}`);
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <ProfileContent activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
