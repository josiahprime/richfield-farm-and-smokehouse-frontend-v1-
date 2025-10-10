'use client'
import { ProfileSection } from "app/(public)/account/page";
import { NotificationsContent } from "./NotificationContent";
import { AccountOverview } from "./AccountOverview";
import OrdersContent from "./OrdersContent";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useSearchParams } from "next/navigation";
import NotificationDetail from "../NotificationDetail/NotificationDetail";
import AccountManagement from "../AccountManagement/AccountManagementDetail";
import WishlistPage from "./Wishlist";

interface ProfileContentProps {
  activeSection: ProfileSection;
}

export function ProfileContent({ activeSection }: ProfileContentProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const notificationId = searchParams.get("id")

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <AccountOverview />;
      
      case 'orders':
      return orderId ? (
        <OrderDetails orderId={orderId} />
      ) : (
        <OrdersContent />
      );

      case "notifications":
        return notificationId ? (
          <NotificationDetail notificationId = {notificationId}/>
        ) : (
          <NotificationsContent />
        )

      case "reviews":
        return (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 border-b">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Pending Reviews</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-gray-600">Rate and review your recent purchases to help other customers.</p>
            </div>
          </div>
        );

      case "wishlist":
        return (
          <WishlistPage/>
        );

        case 'management':
        return <AccountManagement/>

      default:
        return (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 border-b">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Coming Soon</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-gray-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return renderContent();
}
