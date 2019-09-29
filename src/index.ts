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
  userStream.on('data', data => {
    console.log('user stream:', data);
  });

  // TODO strong-type creation param
  const user = await UserModel.create({ name: 'Jim Doe' });
  console.log('created user:', user);

  // * close connection
  mongoose.connection.close();
})();
