export function returnPositionComplement(position) {
  switch (position) {
    case 1:
      return { ordinal: "st", emoji: "🏆" };

    case 2:
      return { ordinal: "nd", emoji: "🥈" };

    case 3:
      return { ordinal: "rd", emoji: "🥉" };

    default:
      return { ordinal: "th" };
  }
}
