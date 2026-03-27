export default class Keyboard {
    root: HTMLElement;
    key: {
        [key: string]: boolean;
    };
    constructor(root: HTMLElement);
}
