import { Rule, SchematicContext, Tree, externalSchematic } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function moyabeUi(_options: any): Rule {

  console.log('Hello from your new schematic!')
  const name = _options.name
  return (tree: Tree, _context: SchematicContext) => {
    console.log('MY NAME: ', name)
    return tree;
  };
}
