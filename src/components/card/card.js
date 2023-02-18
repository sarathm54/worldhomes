import Image from "next/image";

export default function Card({property, changeHome}) {
    return (
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            {/* className="animate-pulse" */}
            <div className="flex space-x-4">
                <div className="rounded-full bg-gray-400 h-12 w-28 cursor-pointer" onClick={() => changeHome(property.id)}>
                    <Image src={property.thumbnailURL} alt="" width={150} height="150"></Image>
                </div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-400 rounded w-3/4">{property.name}</div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-400 rounded">Period: {property.rentalPeriod}</div>
                        <div className="h-4 bg-gray-400 rounded w-5/6">Price: {property.price} {property.unit}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
