"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Card_1 = require("react-bootstrap/Card");
function LargeEventsCard(props) {
    const title = props.event.title;
    const startdate = props.event.startdate;
    const location = props.event.location;
    const starttime = props.event.starttime;
    const endtime = props.event.endtime;
    const image = props.event.image;
    return (jsx_runtime_1.jsxs("div", Object.assign({ style: { display: 'flex', margin: '15px', justifyContent: 'center' } }, { children: [jsx_runtime_1.jsx(Card_1.default, Object.assign({ className: "eventCard", style: { fontFamily: "Poppins, sans-serif", width: '30rem', margin: '0px' } }, { children: jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("h2", { children: title }, void 0), jsx_runtime_1.jsxs("h5", { children: ["Date: ", startdate] }, void 0), jsx_runtime_1.jsxs("h5", { children: ["Meeting Spot: ", location] }, void 0), jsx_runtime_1.jsxs("h5", { children: ["Times: ", starttime, " - ", endtime] }, void 0)] }, void 0) }), void 0), jsx_runtime_1.jsx("img", { style: { height: '15rem', width: '25rem' }, src: image, alt: "" }, void 0)] }), void 0));
}
exports.default = LargeEventsCard;
