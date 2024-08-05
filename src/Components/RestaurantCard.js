import { CDN_URL } from "../utils/constants";
import { MdStars } from "react-icons/md";
import { LuDot } from "react-icons/lu";

const RestaurantCard = ({ rest_data }) => {
  const { id, name, cloudinaryImageId, cuisines, avgRating, sla, costForTwo } =
    rest_data?.info;
  return (
    <div className="w-[250px] h-[350px] flex flex-col cursor-pointer rounded-xl ml-auto mr-auto ease-in-out duration-1000 hover:scale-90 mb-4">
      <div className="w-[250px] h-[200px] flex items-center justify-end">
        <img
          className="w-[100%] h-[100%] overflow-hidden rounded-xl scale-100"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <div className="p-[15px] mt-1">
        <h3 className="m-2 text-base text-[#43474b] dark:text-white">{name}</h3>
        <h4 className="m-2 flex items-center gap-[2px]">
          <span className="text-green-600 text-base mt-[5px]">
            <MdStars />
          </span>{" "}
          <span className="text-slate-300">{avgRating}</span>
          <span className="mt-[5px]">
            <LuDot className="text-lg text-[#868e96] ml-0 mr-0" />
          </span>
          <span className="text-slate-300">{sla.slaString}</span>
        </h4>
        <h4 className="text-wrap text-[#868e96] text-base font-normal">
          {cuisines.join(" ").length > 20
            ? `${cuisines.join(" ").substring(0, 26)}...`
            : cuisines.join(" ")}
        </h4>
        <h4 className="text-[#868e96] text-base font-normal">{costForTwo}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;