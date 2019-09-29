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
// * UserModel is a regular Mongoose Model with correct types

(async () => {
  const userStream = UserModel.watch();
  userStream.on('change', change => {
    console.log('user stream:', change);
  });

  // TODO strong-type creation param
  // * unexpectedly not picked up by change stream
  const user = await UserModel.create({ name: 'Jake Doe' });
  console.log('created user:', user);

  userStream.close();
  // * close connection
  mongoose.connection.close();
})();
