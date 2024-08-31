"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateObjectFitBounds = void 0;
var bounds_1 = require("../css/layout/bounds");
var calculateObjectFitBounds = function (objectFit, objectPosition, naturalWidth, naturalHeight, clientWidth, clientHeight) {
    var naturalRatio = naturalWidth / naturalHeight;
    var clientRatio = clientWidth / clientHeight;
    // 'object-position' is not currently supported, so use default value of 50% 50%.
    // const objectPositionX = 0.5;
    // const objectPositionY = 0.5;
    // const position = getAbsoluteValueForTuple(objectPosition, naturalWidth - clientWidth, naturalHeight - clientHeight);
    var srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight;
    if (objectFit === "scale-down" /* SCALE_DOWN */) {
        objectFit =
            naturalWidth < clientWidth && naturalHeight < clientHeight
                ? "none" /* NONE */
                : "contain" /* CONTAIN */; // at least one axes is greater or equal in size
    }
    if (objectPosition.isPercentage) {
        objectPosition.x = objectPosition.x * 0.01;
        objectPosition.y = objectPosition.y * 0.01;
    }
    // console.log(`objectPositionX: ${position[0]}; objectPositionY: ${position[1]}`);
    switch (objectFit) {
        case "contain" /* CONTAIN */:
            srcX = 0;
            srcY = 0;
            srcWidth = naturalWidth;
            srcHeight = naturalHeight;
            if (naturalRatio < clientRatio) {
                // snap to top/bottom
                destY = 0;
                destHeight = clientHeight;
                destWidth = destHeight * naturalRatio;
                destX = objectPosition.isPercentage ? (clientWidth - destWidth) * objectPosition.x : objectPosition.x;
            }
            else {
                // snap to left/right
                destX = 0;
                destWidth = clientWidth;
                destHeight = destWidth / naturalRatio;
                destY = objectPosition.isPercentage ? (clientWidth - destHeight) * objectPosition.y : objectPosition.y;
            }
            break;
        case "cover" /* COVER */:
            destX = 0;
            destY = 0;
            destWidth = clientWidth;
            destHeight = clientHeight;
            if (naturalRatio < clientRatio) {
                // fill left/right
                srcX = 0;
                srcWidth = naturalWidth;
                srcHeight = clientHeight * (naturalWidth / clientWidth);
                srcY = objectPosition.isPercentage ? (naturalHeight - srcHeight) * objectPosition.y : objectPosition.y;
            }
            else {
                // fill top/bottom
                srcY = 0;
                srcHeight = naturalHeight;
                srcWidth = clientWidth * (naturalHeight / clientHeight);
                srcX = objectPosition.isPercentage ? (naturalWidth - srcWidth) * objectPosition.x : objectPosition.x;
            }
            break;
        case "none" /* NONE */:
            if (naturalWidth < clientWidth) {
                srcX = 0;
                srcWidth = naturalWidth;
                destX = objectPosition.isPercentage ? (clientWidth - naturalWidth) * objectPosition.x : objectPosition.x;
                destWidth = naturalWidth;
            }
            else {
                srcX = objectPosition.isPercentage ? (naturalWidth - clientWidth) * objectPosition.x : objectPosition.x;
                srcWidth = clientWidth;
                destX = 0;
                destWidth = clientWidth;
            }
            if (naturalHeight < clientHeight) {
                srcY = 0;
                srcHeight = naturalHeight;
                destY = objectPosition.isPercentage ? (clientHeight - naturalHeight) * objectPosition.y : objectPosition.y;
                destHeight = naturalHeight;
            }
            else {
                srcY = objectPosition.isPercentage ? (naturalHeight - clientHeight) * objectPosition.y : objectPosition.y;
                srcHeight = clientHeight;
                destY = 0;
                destHeight = clientHeight;
            }
            break;
        case "fill" /* FILL */:
        default:
            srcX = 0;
            srcY = 0;
            srcWidth = naturalWidth;
            srcHeight = naturalHeight;
            destX = 0;
            destY = 0;
            destWidth = clientWidth;
            destHeight = clientHeight;
            break;
    }
    return {
        src: new bounds_1.Bounds(srcX, srcY, srcWidth, srcHeight),
        dest: new bounds_1.Bounds(destX, destY, destWidth, destHeight)
    };
};
exports.calculateObjectFitBounds = calculateObjectFitBounds;
//# sourceMappingURL=object-fit.js.map