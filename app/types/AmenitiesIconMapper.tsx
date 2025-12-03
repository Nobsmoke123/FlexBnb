import {
  FaHiking,
  FaHotTub,
  FaParking,
  FaSnowboarding,
  FaSwimmingPool,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa";
import { AmenityKey } from "./PropertyAddFormTypes";
import { PiTelevision } from "react-icons/pi";
import {
  MdBalcony,
  MdBeachAccess,
  MdCoffeeMaker,
  MdLocalLaundryService,
  MdOutdoorGrill,
  MdOutlineKitchen,
} from "react-icons/md";
import { TbAirConditioning, TbDog } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { BiSolidWasher } from "react-icons/bi";
import { FaElevator } from "react-icons/fa6";
import { GiFireplace, GiGuards, GiMountaintop } from "react-icons/gi";
import { SiInternetcomputer } from "react-icons/si";

export const amenitiesIconMapper: Record<
  AmenityKey,
  Record<string, React.ReactNode>
> = {
  amenity_wifi: {
    icon: <FaWifi className="text-zinc-800" size={20} />,
  },

  amenity_kitchen: {
    icon: <MdOutlineKitchen className="text-zinc-800" size={20} />,
  },

  amenity_washer_dryer: {
    icon: <MdLocalLaundryService className="text-zinc-800" size={20} />,
  },

  amenity_free_parking: {
    icon: <FaParking className="text-zinc-800" size={20} />,
  },

  amenity_pool: {
    icon: <FaSwimmingPool className="text-zinc-800" size={20} />,
  },

  amenity_hot_tub: {
    icon: <FaHotTub className="text-zinc-800" size={20} />,
  },

  amenity_24_7_security: {
    icon: <GiGuards className="text-zinc-800" size={20} />,
  },

  amenity_wheelchair_accessible: {
    icon: <FaWheelchair className="text-zinc-800" size={20} />,
  },

  amenity_elevator_access: {
    icon: <FaElevator className="text-zinc-800" size={20} />,
  },

  amenity_dishwasher: {
    icon: <BiSolidWasher className="text-zinc-800" size={20} />,
  },

  amenity_gym_fitness_center: {
    icon: <CgGym className="text-zinc-800" size={20} />,
  },

  amenity_air_conditioning: {
    icon: <TbAirConditioning className="text-zinc-800" size={20} />,
  },

  amenity_balcony_patio: {
    icon: <MdBalcony className="text-zinc-800" size={20} />,
  },

  amenity_smart_tv: {
    icon: <PiTelevision className="text-zinc-800" size={20} />,
  },

  amenity_coffee_maker: {
    icon: <MdCoffeeMaker className="text-zinc-800" size={20} />,
  },

  amenity_mountain_view: {
    icon: <GiMountaintop className="text-zinc-800" size={20} />,
  },

  amenity_hiking_trails_access: {
    icon: <FaHiking className="text-zinc-800" size={20} />,
  },

  amenity_outdoor_grill_bbq: {
    icon: <MdOutdoorGrill className="text-zinc-800" size={20} />,
  },

  amenity_high_speed_internet: {
    icon: <SiInternetcomputer className="text-zinc-800" size={20} />,
  },

  amenity_fireplace: {
    icon: <GiFireplace className="text-zinc-800" size={20} />,
  },

  amenity_beach_access: {
    icon: <MdBeachAccess className="text-zinc-800" size={20} />,
  },

  amenity_pet_friendly: {
    icon: <TbDog className="text-zinc-800" size={20} />,
  },

  amenity_ski_equipment_storage: {
    icon: <FaSnowboarding className="text-zinc-800" size={20} />,
  },
} as const;
