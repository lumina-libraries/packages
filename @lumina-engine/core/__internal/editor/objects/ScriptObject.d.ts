import { MainWorker } from "../../sandbox/main/core/MainWorker";
import { CustomObject3D } from "./CustomObject3D";
import { Object3D, type Object3DJSON } from "three";
export declare const ScriptObjectIcon: CustomObject3D["icon"];
export declare const DefaultCode = "\nlet material: Material;\nlet group: Group;\n\n/**\n * Async function to be executed as soon as the script is loaded\n * @param {number} Time The time in seconds since the start of the script\n */\nasync function start(time: number) {\n\n  group = await lib.createGroup(\"Circle cubes\");\n\n  [material] = await lib.materials(\"CubeMat\");\n\n  if (material == undefined) {\n\n    material = await lib.material(\"Lambert\");\n\n    await Promise.all([\n      lib.setMaterialValue(material, \"name\", \"CubeMat\"),\n      lib.setMaterialColor(material, \"color\", sandbox.randomColor())\n    ]);\n    \n  };\n\n  const radius = 50;\n  const cubes: Object3D[] = [];\n\n  for (let i = 0; i < 20; i++) {\n\n    const cube = await lib.defaultObject('cube', {\n      width: 1,\n      height: 1,\n      depth: 1,\n      widthSegments: 1,\n      heightSegments: 1,\n      depthSegments: 1,\n      material: material\n    }, group);\n\n    let x = radius * Math.cos(i / 20 * 2 * Math.PI);\n    let y = radius * Math.sin(i / 20 * 2 * Math.PI);\n\n    await lib.position(cube, [x, y, 0]);\n\n    cubes.push(cube);\n  }\n};\n\n/**\n * Async function to be executed on every frame\n * @param {number} Time The time in seconds since the start of the script\n * @param {number} Delta The time in miliseconds since the last frame\n */\nasync function update(time: number, delta: number) {\n\n  // This will limit the update rate to 1 second\n  // await sandbox.timeout(1000);\n\n  let scale = Math.abs(Math.sin(Date.now() / 400) * 0.75);\n\n  await lib.commands(false);\n\n  await lib.scale(group, [scale, scale, scale]);\n\n  await lib.commands();\n}\n";
export declare class ScriptMap extends EventTarget {
    private readonly data;
    set(id: string, key: string, value: unknown): void;
    get(id: string, key: string): unknown;
    has(id: string, key: string): boolean;
    entries(id: string): [string, unknown][];
    setEntries(id: string, entries: Array<[string, any]>): void;
    delete(id: string, key: string): void;
    clear(id: string): void;
}
export declare class ScriptObject extends CustomObject3D {
    code: string;
    language: string;
    static type: string;
    readonly type: string;
    readonly icon: [name: string, color?: string];
    worker?: MainWorker;
    get running(): boolean;
    readonly map: ScriptMap;
    constructor(code?: string, language?: string);
    executing: Promise<unknown>[];
    instance?: MainWorker["worker"];
    state?: "client" | "server";
    execute(instance: MainWorker["worker"], state: ScriptObject["state"]): Promise<void>;
    close(): void;
    toJSON(): Object3DJSON & {
        code: string;
        language: string;
    };
    fromJSON(json: ReturnType<ScriptObject["toJSON"]>): void;
    copy(source: Object3D, recursive?: boolean): this;
}
