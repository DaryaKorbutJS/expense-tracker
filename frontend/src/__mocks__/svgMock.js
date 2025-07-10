const React = require("react");
const SvgMock = React.forwardRef(function SvgMock(props, ref) {
  return React.createElement("svg", { ref, ...props });
});

SvgMock.displayName = "SvgMock";

module.exports = {
  __esModule: true,
  default: SvgMock,
  ReactComponent: SvgMock,
};