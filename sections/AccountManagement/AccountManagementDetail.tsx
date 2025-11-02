import { AccountHeader } from "./AccountHeader";
import { ProfileCard } from "./ProfileCard";
import { PasswordCard } from "./PasswordCard";
import { AddressCard } from "./AddressCard";
// import { OrdersSection } from "./OrdersSection";
import { AccountActions } from "./AccountActions";

const AccountManagement = () => {

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <AccountHeader />
        
        <div className="grid gap-6">
          <ProfileCard />
          <PasswordCard />
          <AddressCard />
          {/* <OrdersSection /> */}
          <AccountActions />
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;