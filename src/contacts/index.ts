export const getAllPosts = async () => {
  const data = await fetch("/api/post").then((data) => data.json());
  return data;
};
