"use client";
import { PropertyDetails } from "@/components/PropertyDetails";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View Property Details</Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[90vw] max-w-full md:max-h-[90vh] max-h-full overflow-y-auto overflow-x-hidden bg-gray-100">
          <PropertyDetails />
        </DialogContent>
      </Dialog>
    </div>
  );
}
