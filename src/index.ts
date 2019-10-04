import { getModelForClass, post, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/typegoose-intro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  // * not picked up by change stream since the stream listener becomes activate only after 9 milliseconds
  // TODO strong-type creation param
  await UserModel.create({ name: 'James Doe' });

  // userStream.close();
  // mongoose.connection.close();
})();
