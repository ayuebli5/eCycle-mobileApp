import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import updates from "./updates";
import newstype from "./newstype";
import genre from "./genre";
import electronics from "./electronics";
import rewardstype from "./rewardstype";
import partners from "./partners";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    updates,
    newstype,
    genre,
    electronics,
    rewardstype,
    partners,
  ]),
});
