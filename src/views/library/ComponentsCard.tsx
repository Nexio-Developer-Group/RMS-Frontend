import { ComponentsData } from "@/views/library/ComponentsStore";

export const ComponentsCards = (data: ComponentsData) => {
  return (
    <div className="border border-teal-300 rounded-xl p-4 shadow-sm bg-white flex flex-col h-full">
      <div className="space-y-2 flex flex-col flex-1">
        <div className="flex gap-2 flex-wrap border-b border-teal-200 pb-2 justify-between items-center -mx-4 px-4">
          <div className="flex">
            <h3 className="text-xl font-semibold">{data.name}</h3>
          </div>
          <div className="flex">
            <span className="text-sm bg-red-200 px-2 py-1 rounded-full font-semibold text-red-600">
              {data.tags}
            </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex items-center justify-center">
          {data.preview()}
        </div>
      </div>
    </div>
  );
};

export default ComponentsCards;
