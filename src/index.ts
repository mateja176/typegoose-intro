import { prop, Typegoose } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/typegoose', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(c => c);

class User extends Typegoose {
  @prop()
  name?: string;
}

const UserModel = new User().getModelForClass(User);
// UserModel is a regular Mongoose Model with correct types

(async () => {
  const u = await UserModel.create({ name: 'Jane Doe' });
  console.log(u);
  const user = await UserModel.findOne();

  console.log(user);
  // prints { _id: 59218f686409d670a97e53e0, name: 'John Doe', __v: 0 }

  // * close connection
  mongoose.connection.close();
})();
