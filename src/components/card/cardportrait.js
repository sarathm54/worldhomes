import Image from "next/image";

export default function CardPortrait({property}) {
    return (
        // <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto pointer-events-auto">
        //     {/* className="animate-pulse" */}
        //     <div className="flex space-x-4">
        //         <div className="rounded-full bg-gray-400 h-48 w-60 cursor-pointer">
        //             <Image src={property.image} alt="" width={450} height="150"></Image>
        //         </div>
        //         <div className="flex-1 space-y-4 py-1">
        //             <div className="h-4 bg-gray-400 rounded w-3/4">{property.name}</div>
        //             <div className="space-y-2">
        //                 <div className="h-4 bg-gray-400 rounded">Period: {property.rentalPeriod}</div>
        //                 <div className="h-4 bg-gray-400 rounded w-5/6">Price: {property.price} {property.unit}</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <Image class="w-full" src={property.image} width={450} height="150" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{property.name}</div>
                <p class="text-gray-700 text-base">
                   {property.description}
                </p>
                </div>
            <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">List</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>
    );
}
