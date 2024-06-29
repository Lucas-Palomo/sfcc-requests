'use strict';

/**
 * @name ContentType
 * @description Constructor to create a instance of a ContentType
 * @param {string} type
 * @param {string} subtype
 */
function ContentType(type, subtype) {

    ContentType.prototype.type = type;
    ContentType.prototype.subtype = subtype;

    /**
     * @name getValue
     * @description Gets the Content-Type value without encoding, to use an encoding charset see the method getValueEncoded.
     * @return {string} The Content-Type value
     */
    ContentType.prototype.getValue = function () {
        return ContentType.prototype.type + "/" + ContentType.prototype.subtype
    }

    /**
     * @name getValueEncoded
     * @description Gets the Content-Type value with an explicit value for encoding.
     * @param {string} encoding Encoding of the text. For example, "UTF-8" or "ISO-8859-1"
     * @return {string} The Content-Type value with Encoding
     */
    ContentType.prototype.getValueEncoded = function (encoding) {
        return ContentType.prototype.getValue() + "; charset:" + encoding;
    }
}

const APPLICATION_TYPE = "application",
    AUDIO_TYPE = "audio",
    IMAGE_TYPE = "image",
    TEXT_TYPE = "text",
    VIDEO_TYPE = "video",
    WILDCARD = "*";

/**
 * @name ContentTypes
 * @public
 * @type {{ZIP: (function(): ContentType), TAR: (function(): ContentType), PNG: (function(): ContentType), HTML: (function(): ContentType), XRD: (function(): ContentType), MICROSOFT_WORD: (function(): ContentType), ANY_APPLICATION_TYPE: (function(): ContentType), ANY_AUDIO_TYPE: (function(): ContentType), SHOCKWAVE_FLASH: (function(): ContentType), TEXT_JAVASCRIPT: (function(): ContentType), ANY_IMAGE_TYPE: (function(): ContentType), WEBM_VIDEO: (function(): ContentType), MBOX: (function(): ContentType), APPLICATION_BINARY: (function(): ContentType), WEBM_AUDIO: (function(): ContentType), MANIFEST_JSON: (function(): ContentType), PSD: (function(): ContentType), MPEG_AUDIO: (function(): ContentType), OGG_AUDIO: (function(): ContentType), GIF: (function(): ContentType), KML: (function(): ContentType), CACHE_MANIFEST: (function(): ContentType), I_CALENDAR: (function(): ContentType), APPLE_MOBILE_CONFIG: (function(): ContentType), OOXML_SHEET: (function(): ContentType), WOFF: (function(): ContentType), PLAIN_TEXT: (function(): ContentType), MICROSOFT_POWERPOINT: (function(): ContentType), OOXML_DOCUMENT: (function(): ContentType), WEBP: (function(): ContentType), QUICKTIME: (function(): ContentType), SKETCHUP: (function(): ContentType), TSV: (function(): ContentType), WML: (function(): ContentType), KMZ: (function(): ContentType), PROTOBUF: (function(): ContentType), MP4_VIDEO: (function(): ContentType), APPLICATION_XML: (function(): ContentType), VCARD: (function(): ContentType), JAVASCRIPT: (function(): ContentType), WMV: (function(): ContentType), RDF_XML: (function(): ContentType), SVG: (function(): ContentType), RTF: (function(): ContentType), CRW: (function(): ContentType), JPEG: (function(): ContentType), JSON: (function(): ContentType), ATOM: (function(): ContentType), TIFF: (function(): ContentType), OPENDOCUMENT_GRAPHICS: (function(): ContentType), PDF: (function(): ContentType), EPUB: (function(): ContentType), ANY_TYPE: (function(): ContentType), OPENDOCUMENT_PRESENTATION: (function(): ContentType), MPEG_VIDEO: (function(): ContentType), APPLE_PASSBOOK: (function(): ContentType), BZIP2: (function(): ContentType), DART: (function(): ContentType), CSS: (function(): ContentType), OCTET_STREAM: (function(): ContentType), OPENDOCUMENT_SPREADSHEET: (function(): ContentType), BMP: (function(): ContentType), CSV: (function(): ContentType), MP4_AUDIO: (function(): ContentType), ANY_VIDEO_TYPE: (function(): ContentType), OGG_CONTAINER: (function(): ContentType), EOT: (function(): ContentType), OGG_VIDEO: (function(): ContentType), ANY_TEXT_TYPE: (function(): ContentType), ICO: (function(): ContentType), FORM_DATA: (function(): ContentType), XML: (function(): ContentType), OOXML_PRESENTATION: (function(): ContentType), KEY_ARCHIVE: (function(): ContentType), MICROSOFT_EXCEL: (function(): ContentType), XHTML: (function(): ContentType), GZIP: (function(): ContentType), POSTSCRIPT: (function(): ContentType), OPENDOCUMENT_TEXT: (function(): ContentType), SFNT: (function(): ContentType)}}
 * @description returns the most commons content-types
 */
let ContentTypes = {
    CUSTOM: (type, subType) => new ContentType(type, subType),
    ANY_TYPE: () => new ContentType(WILDCARD, WILDCARD),
    ANY_TEXT_TYPE: () => new ContentType(TEXT_TYPE, WILDCARD),
    ANY_IMAGE_TYPE: () => new ContentType(IMAGE_TYPE, WILDCARD),
    ANY_AUDIO_TYPE: () => new ContentType(AUDIO_TYPE, WILDCARD),
    ANY_VIDEO_TYPE: () => new ContentType(VIDEO_TYPE, WILDCARD),
    ANY_APPLICATION_TYPE: () => new ContentType(APPLICATION_TYPE, WILDCARD),
    CACHE_MANIFEST: () => new ContentType(TEXT_TYPE, "cache-manifest"),
    CSS: () => new ContentType(TEXT_TYPE, "css"),
    CSV: () => new ContentType(TEXT_TYPE, "csv"),
    HTML: () => new ContentType(TEXT_TYPE, "html"),
    I_CALENDAR: () => new ContentType(TEXT_TYPE, "calendar"),
    PLAIN_TEXT: () => new ContentType(TEXT_TYPE, "plain"),
    TEXT_JAVASCRIPT: () => new ContentType(TEXT_TYPE, "javascript"),
    TSV: () => new ContentType(TEXT_TYPE, "tab-separated-values"),
    VCARD: () => new ContentType(TEXT_TYPE, "vcard"),
    WML: () => new ContentType(TEXT_TYPE, "vnd.wap.wml"),
    XML: () => new ContentType(TEXT_TYPE, "xml"),
    BMP: () => new ContentType(IMAGE_TYPE, "bmp"),
    CRW: () => new ContentType(IMAGE_TYPE, "x-canon-crw"),
    GIF: () => new ContentType(IMAGE_TYPE, "gif"),
    ICO: () => new ContentType(IMAGE_TYPE, "vnd.microsoft.icon"),
    JPEG: () => new ContentType(IMAGE_TYPE, "jpeg"),
    PNG: () => new ContentType(IMAGE_TYPE, "png"),
    PSD: () => new ContentType(IMAGE_TYPE, "vnd.adobe.photoshop"),
    SVG: () => new ContentType(IMAGE_TYPE, "svg+xml"),
    TIFF: () => new ContentType(IMAGE_TYPE, "tiff"),
    WEBP: () => new ContentType(IMAGE_TYPE, "webp"),
    MP4_AUDIO: () => new ContentType(AUDIO_TYPE, "mp4"),
    MPEG_AUDIO: () => new ContentType(AUDIO_TYPE, "mpeg"),
    OGG_AUDIO: () => new ContentType(AUDIO_TYPE, "ogg"),
    WEBM_AUDIO: () => new ContentType(AUDIO_TYPE, "webm"),
    MP4_VIDEO: () => new ContentType(VIDEO_TYPE, "mp4"),
    MPEG_VIDEO: () => new ContentType(VIDEO_TYPE, "mpeg"),
    OGG_VIDEO: () => new ContentType(VIDEO_TYPE, "ogg"),
    QUICKTIME: () => new ContentType(VIDEO_TYPE, "quicktime"),
    WEBM_VIDEO: () => new ContentType(VIDEO_TYPE, "webm"),
    WMV: () => new ContentType(VIDEO_TYPE, "x-ms-wmv"),
    APPLICATION_XML: () => new ContentType(APPLICATION_TYPE, "xml"),
    ATOM: () => new ContentType(APPLICATION_TYPE, "atom+xml"),
    BZIP2: () => new ContentType(APPLICATION_TYPE, "x-bzip2"),
    DART: () => new ContentType(APPLICATION_TYPE, "dart"),
    APPLE_PASSBOOK: () => new ContentType(APPLICATION_TYPE, "vnd.apple.pkpass"),
    EOT: () => new ContentType(APPLICATION_TYPE, "vnd.ms-fontobject"),
    EPUB: () => new ContentType(APPLICATION_TYPE, "epub+zip"),
    FORM_DATA: () => new ContentType(APPLICATION_TYPE, "x-www-form-urlencoded"),
    KEY_ARCHIVE: () => new ContentType(APPLICATION_TYPE, "pkcs12"),
    APPLICATION_BINARY: () => new ContentType(APPLICATION_TYPE, "binary"),
    GZIP: () => new ContentType(APPLICATION_TYPE, "x-gzip"),
    JAVASCRIPT: () => new ContentType(APPLICATION_TYPE, "javascript"),
    JSON: () => new ContentType(APPLICATION_TYPE, "json"),
    MANIFEST_JSON: () => new ContentType(APPLICATION_TYPE, "manifest+json"),
    KML: () => new ContentType(APPLICATION_TYPE, "vnd.google-earth.kml+xml"),
    KMZ: () => new ContentType(APPLICATION_TYPE, "vnd.google-earth.kmz"),
    MBOX: () => new ContentType(APPLICATION_TYPE, "mbox"),
    APPLE_MOBILE_CONFIG: () => new ContentType(APPLICATION_TYPE, "x-apple-aspen-config"),
    MICROSOFT_EXCEL: () => new ContentType(APPLICATION_TYPE, "vnd.ms-excel"),
    MICROSOFT_POWERPOINT: () => new ContentType(APPLICATION_TYPE, "vnd.ms-powerpoint"),
    MICROSOFT_WORD: () => new ContentType(APPLICATION_TYPE, "msword"),
    OCTET_STREAM: () => new ContentType(APPLICATION_TYPE, "octet-stream"),
    OGG_CONTAINER: () => new ContentType(APPLICATION_TYPE, "ogg"),
    OOXML_DOCUMENT: () => new ContentType(APPLICATION_TYPE, "vnd.openxmlformats-officedocument.wordprocessingml.document"),
    OOXML_PRESENTATION: () => new ContentType(APPLICATION_TYPE, "vnd.openxmlformats-officedocument.presentationml.presentation"),
    OOXML_SHEET: () => new ContentType(APPLICATION_TYPE, "vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    OPENDOCUMENT_GRAPHICS: () => new ContentType(APPLICATION_TYPE, "vnd.oasis.opendocument.graphics"),
    OPENDOCUMENT_PRESENTATION: () => new ContentType(APPLICATION_TYPE, "vnd.oasis.opendocument.presentation"),
    OPENDOCUMENT_SPREADSHEET: () => new ContentType(APPLICATION_TYPE, "vnd.oasis.opendocument.spreadsheet"),
    OPENDOCUMENT_TEXT: () => new ContentType(APPLICATION_TYPE, "vnd.oasis.opendocument.text"),
    PDF: () => new ContentType(APPLICATION_TYPE, "pdf"),
    POSTSCRIPT: () => new ContentType(APPLICATION_TYPE, "postscript"),
    PROTOBUF: () => new ContentType(APPLICATION_TYPE, "protobuf"),
    RDF_XML: () => new ContentType(APPLICATION_TYPE, "rdf+xml"),
    RTF: () => new ContentType(APPLICATION_TYPE, "rtf"),
    SFNT: () => new ContentType(APPLICATION_TYPE, "font-sfnt"),
    SHOCKWAVE_FLASH: () => new ContentType(APPLICATION_TYPE, "x-shockwave-flash"),
    SKETCHUP: () => new ContentType(APPLICATION_TYPE, "vnd.sketchup.skp"),
    TAR: () => new ContentType(APPLICATION_TYPE, "x-tar"),
    WOFF: () => new ContentType(APPLICATION_TYPE, "font-woff"),
    XHTML: () => new ContentType(APPLICATION_TYPE, "xhtml+xml"),
    XRD: () => new ContentType(APPLICATION_TYPE, "xrd+xml"),
    ZIP: () => new ContentType(APPLICATION_TYPE, "zip")
}

module.exports = ContentTypes