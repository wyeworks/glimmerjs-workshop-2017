export default function renderIfEquals(params) {
  const [valueToRender, value1, value2] = params;
  return value1 === value2 ? valueToRender : '';
}
