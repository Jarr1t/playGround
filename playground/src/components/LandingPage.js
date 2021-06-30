"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
function LandingPage() {
    function addActive(e) {
        const showcase = document.querySelector('.showcase');
        if (showcase.className === 'showcase active') {
            showcase.className = 'showcase';
        }
        else {
            showcase.className = 'showcase active';
        }
        return (e.target.className === 'toggle active') ?
            e.target.className = 'toggle'
            : e.target.className = 'toggle active';
    }
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("section", Object.assign({ className: "showcase" }, { children: [jsx_runtime_1.jsxs("div", Object.assign({ id: "nav" }, { children: [jsx_runtime_1.jsx("h2", Object.assign({ className: "logo" }, { children: "PlayGround" }), void 0), jsx_runtime_1.jsx("div", { className: "toggle", onClick: (event) => addActive }, void 0)] }), void 0), jsx_runtime_1.jsx("video", { src: "/assets/scene2.mp4", loop: true, autoPlay: true, muted: true }, void 0), jsx_runtime_1.jsx("div", { className: "overlay" }, void 0), jsx_runtime_1.jsxs("div", Object.assign({ className: "text" }, { children: [jsx_runtime_1.jsx("h2", { children: "Lets bring" }, void 0), jsx_runtime_1.jsx("h3", { children: "communities back!" }, void 0), jsx_runtime_1.jsx("p", { children: "Covid-19 crippled the world. Everything had come to a sudden stop for over a year. Now that Covid-19 has goten better the world is now opening back up but for some it may be difficult to now rejoin our communities. Playground is there to make the stress and worries of all of it slide away." }, void 0), jsx_runtime_1.jsx("a", Object.assign({ href: "/login" }, { children: "Explore" }), void 0)] }), void 0), jsx_runtime_1.jsxs("ul", Object.assign({ className: "social" }, { children: [jsx_runtime_1.jsx("li", { children: jsx_runtime_1.jsx(react_router_dom_1.Link, Object.assign({ to: "#", className: "a" }, { children: jsx_runtime_1.jsx("img", { src: "/assets/facebook.png", alt: "" }, void 0) }), void 0) }, void 0), jsx_runtime_1.jsx("li", { children: jsx_runtime_1.jsx(react_router_dom_1.Link, Object.assign({ to: "#", className: "a" }, { children: jsx_runtime_1.jsx("img", { src: "/assets/twitter.png", alt: "" }, void 0) }), void 0) }, void 0), jsx_runtime_1.jsx("li", { children: jsx_runtime_1.jsx(react_router_dom_1.Link, Object.assign({ to: "#", className: "a" }, { children: jsx_runtime_1.jsx("img", { src: "/assets/instagram.png", alt: "" }, void 0) }), void 0) }, void 0)] }), void 0)] }), void 0), jsx_runtime_1.jsx("div", Object.assign({ className: "menu" }, { children: jsx_runtime_1.jsxs("ul", { children: [jsx_runtime_1.jsx("li", { children: jsx_runtime_1.jsx(react_router_dom_1.Link, Object.assign({ to: "/login", className: "a" }, { children: "Login" }), void 0) }, void 0), jsx_runtime_1.jsx("li", { children: jsx_runtime_1.jsx(react_router_dom_1.Link, Object.assign({ to: "/signUp", className: "a" }, { children: "Sign Up" }), void 0) }, void 0)] }, void 0) }), void 0)] }, void 0));
}
exports.default = LandingPage;
