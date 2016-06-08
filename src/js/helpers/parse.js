export default function parse(data) {
  let i = 0;
  return data.results.map(item => {
    return {
      ...item,
      id: i++,
      date: new Date(item.publishedDate).getTime(),
      searchTitle: item.titleNoFormatting.toLowerCase()
    }
  });
};
