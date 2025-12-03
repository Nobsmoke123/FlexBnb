export type PropertyAddForm = {
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: {
    amenity_wifi: {
      value: boolean;
      text: string;
    };

    amenity_kitchen: {
      value: boolean;
      text: string;
    };

    amenity_washer_dryer: {
      value: boolean;
      text: string;
    };

    amenity_free_parking: {
      value: boolean;
      text: string;
    };

    amenity_pool: {
      value: boolean;
      text: string;
    };

    amenity_hot_tub: {
      value: boolean;
      text: string;
    };

    amenity_24_7_security: {
      value: boolean;
      text: string;
    };

    amenity_wheelchair_accessible: {
      value: boolean;
      text: string;
    };

    amenity_elevator_access: {
      value: boolean;
      text: string;
    };

    amenity_dishwasher: {
      value: boolean;
      text: string;
    };

    amenity_gym_fitness_center: {
      value: boolean;
      text: string;
    };

    amenity_air_conditioning: {
      value: boolean;
      text: string;
    };

    amenity_balcony_patio: {
      value: boolean;
      text: string;
    };

    amenity_smart_tv: {
      value: boolean;
      text: string;
    };

    amenity_coffee_maker: {
      value: boolean;
      text: string;
    };
  };
  rates: {
    weekly: number;
    monthly: number;
    nightly: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: File[];
};

const amenities = {
  amenity_wifi: false,
  amenity_kitchen: false,
  amenity_washer_dryer: false,
  amenity_free_parking: false,
  amenity_pool: false,
  amenity_hot_tub: false,
  amenity_24_7_security: false,
  amenity_wheelchair_accessible: false,
  amenity_elevator_access: false,
  amenity_dishwasher: false,
  amenity_gym_fitness_center: false,
  amenity_air_conditioning: false,
  amenity_balcony_patio: false,
  amenity_smart_tv: false,
  amenity_coffee_maker: false,
} as const;

export type AmenityKey = keyof typeof amenities;

export const PropertyAddFormBlankState = {
  name: "",
  type: "",
  description: "",
  location: {
    street: "",
    city: "",
    state: "",
    zipcode: "",
  },
  beds: 1,
  baths: 1,
  square_feet: 1000,
  amenities: {
    amenity_wifi: {
      value: false,
      text: "amenity_wifi",
    },
    amenity_kitchen: {
      value: false,
      text: "amenity_kitchen",
    },
    amenity_washer_dryer: {
      value: false,
      text: "amenity_washer_dryer",
    },
    amenity_free_parking: {
      value: false,
      text: "amenity_free_parking",
    },
    amenity_pool: {
      value: false,
      text: "amenity_pool",
    },
    amenity_hot_tub: {
      value: false,
      text: "amenity_hot_tub",
    },
    amenity_24_7_security: {
      value: false,
      text: "amenity_24_7_security",
    },
    amenity_wheelchair_accessible: {
      value: false,
      text: "amenity_wheelchair_accessible",
    },
    amenity_elevator_access: {
      value: false,
      text: "amenity_elevator_access",
    },
    amenity_dishwasher: {
      value: false,
      text: "amenity_dishwasher",
    },
    amenity_gym_fitness_center: {
      value: false,
      text: "amenity_gym_fitness_center",
    },
    amenity_air_conditioning: {
      value: false,
      text: "amenity_air_conditioning",
    },
    amenity_balcony_patio: {
      value: false,
      text: "amenity_balcony_patio",
    },
    amenity_smart_tv: {
      value: false,
      text: "amenity_smart_tv",
    },
    amenity_coffee_maker: {
      value: false,
      text: "amenity_coffee_maker",
    },
  },
  rates: {
    weekly: 100,
    monthly: 100,
    nightly: 100,
  },
  seller_info: {
    name: "",
    email: "",
    phone: "",
  },
  images: [],
};

export const amenitiesMapper: Record<AmenityKey, Record<string, string>> = {
  amenity_wifi: {
    text: "Wifi",
  },
  amenity_kitchen: {
    text: "Full kitchen",
  },
  amenity_washer_dryer: {
    text: "Washer & Dryer",
  },
  amenity_free_parking: {
    text: "Free Parking",
  },
  amenity_pool: {
    text: "Swimming Pool",
  },
  amenity_hot_tub: {
    text: "Hot Tub",
  },
  amenity_24_7_security: {
    text: "24/7 Security",
  },
  amenity_wheelchair_accessible: {
    text: "Wheelchair Accessible",
  },
  amenity_elevator_access: {
    text: "Elevator Access",
  },
  amenity_dishwasher: {
    text: "Dishwasher",
  },
  amenity_gym_fitness_center: {
    text: "Gym/Fitness Center",
  },
  amenity_air_conditioning: {
    text: "Air Conditioning",
  },
  amenity_balcony_patio: {
    text: "Balcony/Patio",
  },
  amenity_smart_tv: {
    text: "Smart TV",
  },
  amenity_coffee_maker: {
    text: "Coffee Maker",
  },
} as const;
