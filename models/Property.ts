import { Schema, model, models, Types } from "mongoose";

export interface Property {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  type: string;
  beds: number;
  baths: number;
  description: string;
  location: {
    street: string;
    state: string;
    city: string;
    zipcode: string;
  };
  square_feet: number;
  rates: {
    nightly: number;
    weekly: number;
    monthly: number;
  };
  amenities: string[];
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const propertySchema = new Schema<Property>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Property owner is required."],
  },

  name: {
    type: String,
    required: [true, "Name is required."],
  },

  type: {
    type: String,
    required: [true, "Property type is required."],
  },

  beds: {
    type: Number,
    required: [true, "Number of beds is required."],
  },

  baths: {
    type: Number,
    required: [true, "Number of baths is required"],
  },

  description: {
    type: String,
  },

  location: {
    street: {
      type: String,
      required: [true, "Street is required."],
    },

    city: {
      type: String,
      required: [true, "City is required."],
    },

    state: {
      type: String,
      required: [true, "State is required."],
    },

    zipcode: {
      type: String,
      required: [true, "Zip code is required."],
    },
  },

  square_feet: {
    type: Number,
    required: [true, "Square feet is required."],
  },

  amenities: [
    {
      type: String,
    },
  ],

  rates: {
    nightly: {
      type: Number,
    },
    weekly: {
      type: Number,
    },
    monthly: {
      type: Number,
    },
  },

  seller_info: {
    name: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },
  },

  images: [{ type: String }],

  is_featured: {
    type: Boolean,
    default: false,
  },
});

const PropertyModel =
  models.property || model<Property>("Property", propertySchema);

export default PropertyModel;
