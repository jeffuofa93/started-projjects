import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "reddit_clone",
    type: "postgresql",
    // user: "jeff",
    // password: "steelers1",
    debug: !__prod__,
  });

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
  console.log("------------------------sql 2----------------");
  await orm.em.nativeInsert(Post, { title: "my first post 2" });
};

main().catch((err) => {
  console.error(err);
});
