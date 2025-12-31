import LiveOnlineOrders1 from "@/components/custom/LiveOnlineOrders1";

const Components = () => {
    return (
        <>
            <div className="m-4">

                <div>Library Components View</div>

                <div>
                    <LiveOnlineOrders1
                        orderId="ORD123"
                        platform="Zomato"
                        amount={499}
                        currency="₹"
                        placedAgo="5 mins ago"
                        items={[
                            { name: "Burger", quantity: 2, price: 199 },
                            { name: "Fries", quantity: 1, price: 99 }
                        ]}
                        onAccept={(id) => console.log("Accepted:", id)}
                        onReject={(id) => console.log("Rejected:", id)}
                    />
                </div>
            </div>
        </>
    );
};

export default Components;
