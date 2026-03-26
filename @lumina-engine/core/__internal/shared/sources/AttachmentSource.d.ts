import { DefaultSource } from "./DefaultSource";
import { AttachmentType, type AttachmentConfig } from "../weapons/data/index";
export declare const getAttachmentIconPath: (type: AttachmentType) => string;
export declare class AttachmentSource extends DefaultSource {
    readonly attachmentType: AttachmentType;
    readonly config: AttachmentConfig;
    constructor(config: AttachmentConfig);
}
