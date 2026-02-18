export function getInterpretation(scale: any, totalScore: number): string {
  if (!scale.scoring?.ranges) return '';

  const matchingRange = scale.scoring.ranges.find(
    (range: { min: number; max: number }) =>
      totalScore >= range.min && totalScore <= range.max,
  );

  return matchingRange?.interpretation || '';
}
