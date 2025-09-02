interface PokemonStatBarProps {
  stat: number;
}

function PokemonStatBar({ stat }: PokemonStatBarProps) {
  const getStatColor = (stat: number) => {
    if (stat < 30) return "bg-red-400";
    else if (stat < 60) return "bg-yellow-400";
    else return "bg-green-400";
  };

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full relative">
      <div
        className={`h-2 ${getStatColor(
          stat
        )} rounded-full absolute top-0 left-0`}
        style={{ width: `${stat}%` }}
      ></div>
    </div>
  );
}

export default PokemonStatBar;
