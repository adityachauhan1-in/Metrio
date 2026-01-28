import React  from "react";
import { Card } from "../components/ui/Card";
import { CardContent } from "../components/ui/CardContent";
import Button from "../components/ui/Button";
import { LogOut, User, QrCode, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function UserDashBoard() {
   
   const navigate = useNavigate();
   return ( 
   <> 
      <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Welcome to Metrio</h1>
      <Button variant="outline" className="flex gap-2"  >
    
      <LogOut size={18} /> Logout
      </Button>
      </div>
      
      </div>

      {/* User Info  */}
      <Card className="mb-6 rounded-2xl shadow-sm">
<CardContent className="p-6 flex items-center gap-4">
<User className="w-10 h-10" />
<div>
<p className="text-lg font-medium">Hello, User 👋</p>
<p className="text-sm text-gray-500">Role: User</p>
</div>
</CardContent>
</Card>
    {/* Main Action    */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<Card className="rounded-2xl shadow-sm hover:shadow-md transition">
<CardContent className="p-6">
<QrCode className="w-8 h-8 mb-3" />
<h2 className="text-lg font-semibold mb-2">Scan QR</h2>
<p className="text-sm text-gray-500 mb-4">
Scan QR codes to track entries in real time.
</p>
<Button className="w-full">Start Scanning</Button>
</CardContent>
</Card>
</div>
<div>
<Card className="rounded-2xl shadow-sm hover:shadow-md transition">
<CardContent className="p-6">
<BarChart3 className="w-8 h-8 mb-3" />
<h2 className="text-lg font-semibold mb-2">My Stats</h2>
<p className="text-sm text-gray-500 mb-4">
View your activity and usage analytics.
</p>
<Button className="w-full" variant="outline">View Stats</Button>
</CardContent>
</Card>


<Card className="rounded-2xl shadow-sm hover:shadow-md transition">
<CardContent className="p-6">
<User className="w-8 h-8 mb-3" />
<h2 className="text-lg font-semibold mb-2">Profile</h2>
<p className="text-sm text-gray-500 mb-4">
Manage your account details and settings.
</p>
<Button className="w-full" variant="secondary">Edit Profile</Button>
</CardContent>
</Card>
</div>

      </>
   )
}