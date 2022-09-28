import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const {Schema, model,SchemaTypes} = mongoose

const catSchema = new Schema({
    name: String,
    age: {
        type: Number,
        min: 0,
        max: 35
    },
    isVaccinated: {
        type: Boolean,
        default: false
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    features: {
        type: Array,
        set: (data) => (!data ? [] : data)
    }
}, {
    versionKey: false,
    timestamps: true
},)
catSchema.plugin(mongoosePaginate)
const Cat = model('cat', catSchema)

export default Cat
