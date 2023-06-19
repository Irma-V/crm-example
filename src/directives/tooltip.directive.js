// const tooltipDirective = {
//   mounted: {
//     bind(el, { value }) {
//       M.Tooltip.init(el, { html: value });
//     },
//   },
// };

export default {
  bind(el, {value}) {
      M.Tooltip.init(el, {html: value})
  }
  
//   directives: {
//     tooltipDirective,
//   },
};
