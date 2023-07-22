import { model, Schema } from 'mongoose';

const locationSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    longitude: {
        type: Number, require: true
    },
    latitude: {
        type: Number, require: true
    }
},
    { timestamps: true }
);

locationSchema.pre('find', function () {
    this.populate('user', ['accountId', 'name', 'avatar', 'social', 'twitter']);
});

const Locations = model('locations', locationSchema);

export default Locations;
