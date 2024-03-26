interface CardCustomProps {
  bgWave: string;
  title: string;
  money: string;
}
const CardCustom = ({ bgWave, money, title }: CardCustomProps) => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="wave" style={{ background: `${bgWave}` }}></div>
      <div className="wave" style={{ background: `${bgWave}` }}></div>
      <div className="wave" style={{ background: `${bgWave}` }}></div>

      <div className="infotop">
        <div className="uppercase text-pink-300">{title}</div>
        <div className="text-xl">{money}</div>
        <sub className="text-xl">
          {title === "Total Rooms Sold" ? "" : "VND"}
        </sub>
      </div>
    </div>
  );
};
export default CardCustom;
