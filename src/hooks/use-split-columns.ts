function useSplitIntoTwoColumns<Type>(items: Type[]): [Type[], Type[]] {
  const columnSize = Math.ceil(items?.length / 2);
  const leftColumnItems = items?.slice(0, columnSize);
  const rightColumnItems = items?.slice(columnSize);

  return [leftColumnItems, rightColumnItems];
}

export default useSplitIntoTwoColumns;
