import { Schema, model, Types } from "mongoose";

export interface IProperty {
  owner: Types.ObjectId;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    state: string;
    city: string;
    zipcode: string;
  };
  square_feet: number;
  rate: {
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
}

const propertySchema = new Schema<IProperty>({
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

  rate: {
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

const PropertyModel = model<IProperty>("Property", propertySchema);

export default PropertyModel;
