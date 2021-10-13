import { Node } from './types/Node';

abstract class Parser {
  abstract parse(data: any): Node[];
}

export class DefaultParser extends Parser {
  parse(data: any): Node[] {
    return data;
  }
}

export default Parser;
