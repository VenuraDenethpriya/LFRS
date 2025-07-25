import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LockKeyhole, FileText, Search, Package } from "lucide-react"
import { Link } from "react-router"

function Step({ number, title, icon }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-blue-950">
        {number}
      </div>
      <div className="flex items-center gap-2 text-blue-950">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
    </div>
  )
}

export default function SubSection() {
  return (
    <div id="howItWorks" className="w-full min-h-[500px] bg-slate-200 p-4 md:p-8">
      <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2">
        {/* Lost Item Card */}
        <Link to="/lostreport">
          <Card className="transition-shadow border-2 border-red-500 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-blue-950">REPORT LOST ITEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Step number={1} title="Sign Up or Log In" icon={<LockKeyhole className="w-5 h-5" />} />
              <Step number={2} title="Submit a Lost Item Report" icon={<FileText className="w-5 h-5" />} />
              <Step number={3} title="Police Review & Matching" icon={<Search className="w-5 h-5" />} />
              <Step number={4} title="Recover Your Item" icon={<Package className="w-5 h-5" />} />
            </CardContent>
          </Card>
        </Link>

        {/* Found Item Card */}
        <Link to="/foundreport">
          <Card className="transition-shadow border-2 border-green-500 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-blue-950">REPORT FOUND ITEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Step number={1} title="Sign Up or Log In" icon={<LockKeyhole className="w-5 h-5" />} />
              <Step number={2} title="Submit a Found Item Report" icon={<FileText className="w-5 h-5" />} />
              <Step number={3} title="Police Verification & Matching" icon={<Search className="w-5 h-5" />} />
              <Step number={4} title="Returning the Item" icon={<Package className="w-5 h-5" />} />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

