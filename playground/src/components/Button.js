"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Button(props) {
    const text = props.text;
    const className = props.className;
    const click = props.click;
    return (jsx_runtime_1.jsx("button", Object.assign({ className: className, onClick: click }, { children: text }), void 0));
}
exports.default = Button;
