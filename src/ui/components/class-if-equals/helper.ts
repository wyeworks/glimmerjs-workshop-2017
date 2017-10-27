export default function classIfEquals(params) {
  const [klass, value1, value2] = params;
  return value1 === value2 ? klass : ''; 
};
