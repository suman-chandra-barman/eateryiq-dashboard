import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboardHeader() {
  return (
    <div className="bg-card px-8 py-4 rounded-2xl mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            {" Jhon Marcel"}
          </h2>
          <p>Have a nice day</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Jhon Marcel"
              />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <div className="font-medium text-xl text-foreground">
              Jhon Marcel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
