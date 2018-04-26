import "reflect-metadata";
import {createConnection, In, Equal} from "typeorm";
import {User} from "./entity/User";
import {Photo} from "./entity/Photo"

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);

    console.log("Inserting a new photo into the database...");
    const photo = new Photo();
    photo.description = "Tall trees";
    photo.uri = "www.pictures.pic/1";
    photo.userId = user.id;
    await connection.manager.save(photo);

    console.log("Loading photo from the database by userId...");
    const photos = await connection.manager.find(Photo, { where: { userId: Equal(user.id) } });
    console.log("Loaded photos: ", photos); // => []
    if (photos.length === 0) {
        console.log('Error, could not find photos using advanced find options on an FK');
    }

}).catch(error => console.log(error));
