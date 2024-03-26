function getRandomColor() {
  const getRandomNumber = () => Math.floor(Math.random() * 256);
  return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

export default function getRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  return `linear-gradient(744deg, ${color1}, ${color2} 60%, ${color3})`;
}
