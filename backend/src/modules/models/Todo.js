import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
import toJson from '@meanie/mongoose-to-json'

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    complete: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
  }
);

TodoSchema.plugin(mongoosePaginate);
TodoSchema.plugin(toJson)

export default mongoose.model('Todo', TodoSchema)