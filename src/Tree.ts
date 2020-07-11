import Entity from "./Entity";

class Tree {
  entities: { [key: string]: Entity }
  dir: string

  constructor(dir: string, entities: { [key: string]: Entity }) {
    this.dir = dir
    this.entities = entities
  }

  addEntity(name: string, entity: Entity) {
    if (!this.entities[name]) this.entities[name] = entity;
  }

  removeEntity(name: string) {
    delete this.entities[name]
  }

  protected addRecursively(dirArray: string[]) {

    const path: string[] = []
    dirArray.map(name => {
      if (name[0] === '/') name = name.slice(1, name.length)
      if (name !== "") path.push(name)
    })

    const add = function (tree: { [key: string]: Entity }, path: string[]) {
      let current: string = path.shift()

      if (tree[current]) {
        tree = tree[current].childs
      } else if (!tree[current]) {
        tree[current] = new Entity("UNKNOWN", undefined, {})
        tree = tree[current].childs
      }


      if (path.length) add(tree, path)

      return tree;
    }

    return add(this.entities, path)
  }

  addFromDirArray(dirs: string[]) {
    const dRegex = /\/?([\w\s\.\-\_]*)/g

    dirs.map(dir => {
      const matched = dir.match(dRegex)
      let returnValue = this.addRecursively(matched)

    })

    return this.entities
  }

  get(path: string[], currentTree?: { [key: string]: Entity }): { [key: string]: Entity } {
    if (!currentTree) currentTree = this.entities
    if (!path.length) return currentTree

    const currentPath = path.shift()
    if (!currentTree[currentPath]) return {}

    return this.get(path, currentTree[currentPath].childs)
  }
}

export default Tree;