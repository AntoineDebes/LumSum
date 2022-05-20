const withPlugins = require("next-compose-plugins");
const withReactSvg = require("next-react-svg");
const path = require("path");

module.exports = withPlugins([
    withReactSvg({
        include: path.resolve(__dirname, "src/assets/svg"),
        webpack(config, options) {
            return config;
        },
    }),
    {
        env: {
            UPLOAD_URL: "https://lumsum-assets.s3.me-south-1.amazonaws.com/",
        },
        images: {
            domains: ["www.lumsum.io", "localhost"],
        },
    },
]);
