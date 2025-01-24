export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };
  
  export const findCoverImage = (images: { isCoverImage: boolean; url: string }[]): string | undefined => {
    return images.find((img) => img.isCoverImage)?.url;
  };
  