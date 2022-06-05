/* istanbul ignore file */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const PermissionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    minlength: 36,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: {createdAt: 'createdAt', updatedAt: 'lastModified'},
});

PermissionSchema.pre('save', (next) => {
  (PermissionSchema as any).createdAt = Date.now();
  (PermissionSchema as any).lastModified = Date.now();
  next();
});

PermissionSchema.pre('updateOne', (next) => {
  (PermissionSchema as any).lastModified = Date.now();
  next();
});

PermissionSchema.plugin(uniqueValidator);

PermissionSchema.set('toJSON', {
  transform: (_, doc) => {
    delete doc._id;
    delete doc.__v;
    delete doc.createdAt;
    delete doc.lastModified;
  },
});

export default mongoose.model('PermissionModel', PermissionSchema);
