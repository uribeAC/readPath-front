import { transformBooksDtoToBooks } from "../dto/transformers";
import { shonenFixturesDto } from "./fixturesDto";

export const shonenFixtures = transformBooksDtoToBooks(shonenFixturesDto);

export const narutoBook = shonenFixtures[0];
