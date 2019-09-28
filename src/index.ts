import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

mongoose.connect('mongodb://localhost:27017/typegoose').then(c => c);

class User extends Typegoose {
  @prop()
  name?: string;
}

const UserModel = new User().getModelForClass(User);
// UserModel is a regular Mongoose Model with correct types
const stream = UserModel.watch();
stream.on('data', console.log);

(async () => {
  const u = await UserModel.create({ name: 'JohnDoe' });
  console.log(u);
  const user = await UserModel.findOne();

  console.log(user);
  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
})();
