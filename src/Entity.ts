import EntityType from "./EntityType";
import PropType from "./types/PropType";

class Entity {
  type: EntityType
  props?: PropType
  childs?: { [key: string]: Entity | undefined }

  constructor(
    type?: EntityType,
    props?: PropType,
    childs?: { [key: string]: Entity }
  ) {
    if (type) this.type = type;
    if (props) this.props = props;
    if (childs) this.childs = childs;
  }

  set dir(dir: string) {
    this.dir = dir
  }

  get dir(): string {
    return this.dir
  }

}

export default Entity