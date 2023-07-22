import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  accountId: {
    type: String,
    require: true
  },
  name: {
    type: String, default: ""
  },
  contracts: {
    type: String, require: true
  },
  avatar: {
    type: String, default: ""
  },
  social: {
    type: String, default: "https://social.near.page/u/"
  },
  twitter: {
    type: String, default: "https://twitter.com/"
  },
  role: {
    type: String, default: "user"
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
},
  { timestamps: true }
);

const Users = model('users', userSchema);

export default Users;
