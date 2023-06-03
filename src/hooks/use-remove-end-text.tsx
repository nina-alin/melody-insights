const useRemoveEndText = (text: string) => {
  return text?.replace("Read more on Last.fm", "");
};

export default useRemoveEndText;
