import { getModelForClass, post, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/typegoose', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(c => c);

@post<User>('save', user => {
  console.log('saved:', user);
})
class User {
  @prop()
  name?: string;
}

const UserModel = getModelForClass(User);

const userStream = UserModel.watch();
userStream.on('change', change => {
  console.log('user stream:', change);
});

(async () => {
  // TODO strong-type creation param
  // * unexpectedly not picked up by change stream
  const user = await UserModel.create({ name: 'James Doe' });
  console.log('created user:', user);

  userStream.close();
  // * close connection
  mongoose.connection.close();
})();
