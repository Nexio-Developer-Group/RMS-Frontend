import React from "react";
import LiveOnlineOrders1 from "@/components/custom/LiveOnlineOrders1";

export type ComponentsData = {
  id: string;
  name: string;
  tags: string;
  preview: () => React.ReactNode;
};

export const componentsStore: ComponentsData[] = [
  {
    id: "comp1",
    name: "Live Online Orders #1",
    tags: "Order POS",
    preview: () => (
      <LiveOnlineOrders1
        orderId="ZOM-4335"
        platform="Zomato"
        amount={99.99}
        items={[{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 },{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 }]}
        placedAgo="5 minutes ago"
        onAccept={() => {}}
        onReject={() => {}}
      />
    ),
  },
  {
    id: "comp1",
    name: "Live Online Orders #1",
    tags: "Order POS",
    preview: () => (
      <LiveOnlineOrders1
        orderId="ZOM-4335"
        platform="Zomato"
        amount={99.99}
        items={[{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 },{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 }]}
        placedAgo="5 minutes ago"
        onAccept={() => {}}
        onReject={() => {}}
      />
    ),
  },
  {
    id: "comp1",
    name: "Live Online Orders #1",
    tags: "Order POS",
    preview: () => (
      <LiveOnlineOrders1
        orderId="ZOM-4335"
        platform="Zomato"
        amount={99.99}
        items={[{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 },{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 }]}
        placedAgo="5 minutes ago"
        onAccept={() => {}}
        onReject={() => {}}
      />
    ),
  },
  {
    id: "comp1",
    name: "Live Online Orders #1",
    tags: "Order POS",
    preview: () => (
      <LiveOnlineOrders1
        orderId="ZOM-4335"
        platform="Zomato"
        amount={99.99}
        items={[{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 },{ name: "Butter Chicken", quantity: 1 }, { name: "Naan Bread", quantity: 2}, { name: "Biryani", quantity: 1 }]}
        placedAgo="5 minutes ago"
        onAccept={() => {}}
        onReject={() => {}}
      />
    ),
  },

];
